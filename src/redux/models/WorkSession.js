import {
  fk, attr, Model, many,
} from 'redux-orm';

class WorkSession extends Model { }

WorkSession.modelName = 'WorkSession';

WorkSession.fields = {
  id: attr(),
  datetimeStart: attr(),
  datetimeEnd: attr(),
  info: attr(),
  status: attr(),
  subject: fk('Subject'),
  sprints: many('Sprint', 'workSession'),
};

export default WorkSession;
