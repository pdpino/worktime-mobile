import _ from 'lodash';
import { fk, attr, Model } from 'redux-orm';

const portingWhiteList = ['order', 'status', 'duration'];

function filterWhiteList(obj) {
  return _.pick(obj, portingWhiteList);
}

class Sprint extends Model {
  static import(workSession, importableSprint) {
    // eslint-disable-next-line no-shadow
    const { Sprint } = this.session;

    Sprint.create({
      workSession: workSession.id,
      ...filterWhiteList(importableSprint),
    });
  }

  addDuration(newDuration) {
    return this.update({
      duration: (this.duration || 0) + newDuration,
    });
  }

  exportable() {
    return filterWhiteList(this.ref);
  }
}

Sprint.modelName = 'Sprint';

Sprint.fields = {
  id: attr(),
  order: attr(),
  status: attr(),
  duration: attr(),
  workSession: fk('WorkSession'),
};

export default Sprint;
