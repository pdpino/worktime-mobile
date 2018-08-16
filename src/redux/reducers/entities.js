const entities = orm => (state, action) => {
  const session = orm.session(state);
  const { Subject, WorkSession } = session;

  switch (action.type) {
    case 'UPSERT_SUBJECT':
      Subject.upsert(action.payload.attributes);
      break;
    case 'DELETE_SUBJECT':
      if (Subject.idExists(action.payload.id)) {
        const instance = Subject.withId(action.payload.id);
        instance.delete();
      }
      break;
    case 'START':
      WorkSession.start(action.payload.timestamp, action.payload.subjectId);
      break;
    case 'RESUME':
      WorkSession.withId(action.payload.runningSessionId).resume(action.payload.timestamp);
      break;
    case 'PAUSE':
      WorkSession.withId(action.payload.runningSessionId).pause(action.payload.timestamp);
      break;
    case 'STOP':
      WorkSession.withId(action.payload.runningSessionId).stop(action.payload.timestamp);
      break;
    default:
  }
  return session.state;
};

export default entities;
