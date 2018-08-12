import {
  // many, fk,
  attr, Model,
} from 'redux-orm';

class WorkSession extends Model { }

WorkSession.modelName = 'WorkSession';

WorkSession.fields = {
  id: attr(),
  datetimeStart: attr(),
  datetimeEnd: attr(),
  info: attr(),
  status: attr(),
  // FIXME: Any of these two lines throws:
  // "Attempting to change the setter of an unconfigurable property"
  // subject: fk('Subject'),
  // sprints: many('Sprint', 'workSession'),
};

export default WorkSession;
