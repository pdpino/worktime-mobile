const entities = orm => (state, action) => {
  const session = orm.session(state);
  const { Subject } = session;

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
    default:
  }
  return session.state;
};

export default entities;
