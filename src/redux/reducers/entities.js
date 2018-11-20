const entities = orm => (state, action) => {
  const session = orm.session(state);
  const { Subject, WorkSession } = session;

  switch (action.type) {
    case 'UPSERT_SUBJECT':
      Subject.upsert(action.payload.attributes);
      break;
    case 'DELETE_SUBJECT':
      if (Subject.idExists(action.payload.id)) {
        Subject.withId(action.payload.id).delete();
      }
      break;
    case 'DELETE_WORK_SESSION':
      if (WorkSession.idExists(action.payload.id)) {
        WorkSession.withId(action.payload.id).delete();
      }
      break;
    case 'PLAYER/START':
      WorkSession.start(action.payload.timestamp, action.payload.subject.id);
      break;
    case 'PLAYER/RESUME':
      WorkSession.withId(action.payload.runningSessionId).resume(action.payload.timestamp);
      break;
    case 'PLAYER/PAUSE':
      WorkSession.withId(action.payload.runningSessionId).pause(action.payload.timestamp);
      break;
    case 'PLAYER/STOP':
      WorkSession.withId(action.payload.runningSessionId).stop(action.payload.timestamp);
      break;
    case 'PLAYER/STOP_DISCARD': {
      WorkSession.withId(action.payload.runningSessionId).delete();
      break;
    }
    default:
  }
  return session.state;
};

export default entities;
