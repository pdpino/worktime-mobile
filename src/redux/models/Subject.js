import { attr, Model } from 'redux-orm';

class Subject extends Model {
  getWorkSessions(options = {}) {
    const { sorted } = options;
    const workSessions = this.worksessionSet.toModelArray();
    return sorted
      ? workSessions.sort((ws1, ws2) => ws2.timestampStart - ws1.timestampStart)
      : workSessions;
  }

  exportable() {
    const { id, name, description } = this;
    // NOTE: don't use 'this.ref' here, see TODOs
    return {
      id,
      name,
      description: description || '',
      workSessions: this.getWorkSessions().map(ws => ws.exportable()),
    };
  }

  delete() {
    this.worksessionSet.toModelArray().forEach(workSession => workSession.delete());
    super.delete();
  }
}

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
};

export default Subject;
