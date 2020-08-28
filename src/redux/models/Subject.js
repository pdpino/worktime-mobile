import _ from 'lodash';
import { attr, fk, Model } from 'redux-orm';
import { isNumber } from '../../shared/utils';

const portingWhiteList = ['name', 'description', 'archived', 'icon'];

function filterWhiteList(obj) {
  return _.pickBy(obj, (value, key) => portingWhiteList.includes(key) && value);
}

class Subject extends Model {
  static import(importableSubject) {
    // eslint-disable-next-line no-shadow
    const { Subject, WorkSession } = this.session;

    const subjectId = importableSubject.id;
    const props = filterWhiteList(importableSubject);

    // NOTE: this operation is equivalent to Subject.upsert(props)
    // but is done like this to be explicit about the two cases
    // (id defined or not).
    let subject;
    if (isNumber(subjectId) && Subject.idExists(subjectId)) {
      subject = Subject.withId(subjectId);
      subject.update(props);
    } else {
      subject = Subject.create(props);
    }

    importableSubject.workSessions
      .forEach((workSession) => WorkSession.import(subject, workSession));
  }

  getWorkSessions(options = {}) {
    const { sorted } = options;
    const workSessions = this.worksessionSet.toModelArray();
    return sorted
      ? workSessions.sort((ws1, ws2) => ws2.timestampStart - ws1.timestampStart)
      : workSessions;
  }

  getNameWithCategory(category) {
    /**
     * NOTE: This method can receive a category (object from model)
     * or used the saved one in subject.category.
     * If a category is not passed, it can't be ensured that the most updated
     * category info will be used (name or alias). (i.e., if the name/alias of
     * the category changed recently, the old name/alias will be returned here).
     *
     * If a category object is passed, it should be updated with the latest
     * changes (i.e. it should come from a selector).
     *
     * For instance, `ormSession.Category.withId(subject.getCategoryId())`
     * could be used in a selector that has access to `ormSession`.
     */
    const categoryUsed = category || this.category;
    if (categoryUsed) {
      return `${categoryUsed.getShortName()} - ${this.name}`;
    }
    return this.name;
  }

  getCategoryId() {
    return this.category ? this.category.id : -1;
  }

  exportable() {
    const { name, description, archived } = this;

    const workSessions = this.worksessionSet.toModelArray()
      .reduce((filtered, workSession) => {
        if (workSession.isStopped()) {
          filtered.push(workSession.exportable());
        }
        return filtered;
      }, []);

    return {
      name,
      description: description || '',
      workSessions,
      archived,
    };
  }

  delete() {
    this.worksessionSet.toModelArray().forEach((workSession) => workSession.delete());
    super.delete();
  }
}

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
  archived: attr(),
  category: fk('Category'),
  icon: attr(),
};

export default Subject;
