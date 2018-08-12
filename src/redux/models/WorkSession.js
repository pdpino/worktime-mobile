import { fk, attr, Model } from 'redux-orm';

class WorkSession extends Model { }

WorkSession.modelName = 'WorkSession';

WorkSession.fields = {
  id: attr(),
  datetimeStart: attr(),
  datetimeEnd: attr(),
  info: attr(),
  status: attr(),
  subject: fk('Subject'),
};

export default WorkSession;
