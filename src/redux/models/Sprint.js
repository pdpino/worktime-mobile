import { fk, attr, Model } from 'redux-orm';

class Sprint extends Model {
  addDuration(newDuration) {
    return this.update({
      duration: (this.duration || 0) + newDuration,
    });
  }

  exportable() {
    return {
      ...this.ref,
    };
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
