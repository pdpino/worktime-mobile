import { attr, Model } from 'redux-orm';

class Subject extends Model { }

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
};

export default Subject;
