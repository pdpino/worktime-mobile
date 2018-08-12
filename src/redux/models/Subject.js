import { attr, Model } from 'redux-orm';

class Subject extends Model {
  toString() {
    return `Subject: ${this.name}`;
  }
}

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
  // authors: many('Author', 'books'),
  // publisher: fk('Publisher', 'books'),
};

export default Subject;
