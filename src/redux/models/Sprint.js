import { fk, attr, Model } from 'redux-orm';

class Sprint extends Model { }

Sprint.modelName = 'Sprint';

Sprint.fields = {
  id: attr(),
  order: attr(),
  status: attr(),
  duration: attr(),
  workSession: fk('WorkSession'),
};

export default Sprint;
