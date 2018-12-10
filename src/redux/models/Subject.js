import { attr, Model } from 'redux-orm';
import { isBefore } from '../../shared/utils';

class Subject extends Model {
  getWorkSessions(options = {}) {
    const { sorted } = options;
    const workSessions = this.worksessionSet.toModelArray();
    return sorted
      ? workSessions.sort((ws1, ws2) => ws2.timestampStart - ws1.timestampStart)
      : workSessions;
  }

  exportable(options) {
    const { since } = options;
    const { id, name, description } = this;
    // NOTE: don't use 'this.ref' here, see TODOs

    const workSessions = this.worksessionSet.toModelArray()
      .reduce((filtered, workSession) => {
        if (workSession.isStopped()
          && (!since || isBefore(since, workSession.date))) {
          filtered.push(workSession.exportable());
        }
        return filtered;
      }, []);

    return {
      id,
      name,
      description: description || '',
      workSessions,
    };
  }

  delete() {
    this.worksessionSet.toModelArray().forEach(workSession => workSession.delete());
    super.delete();
  }
}

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
};

export default Subject;
