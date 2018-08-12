import { fk, attr, Model } from 'redux-orm';

class WorkSession extends Model {
  toString() {
    return `WorkSession: ${this.id}`;
  }
}

WorkSession.modelName = 'WorkSession';

WorkSession.fields = {
  id: attr(),
  subject: fk('Subject'),
  // name: attr(),
  // description: attr(),
  // authors: many('Author', 'books'),
  // publisher: fk('Publisher', 'books'),
};

export default WorkSession;
