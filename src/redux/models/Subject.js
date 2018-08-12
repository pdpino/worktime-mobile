import { attr, Model, many } from 'redux-orm';

class Subject extends Model { }

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
  workSessions: many('WorkSession', 'subject'),
};

export default Subject;
