const defaultState = {
  runningSessionId: -1,
};

const work = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_RUNNING_SESSION_ID':
      return {
        ...state,
        runningSessionId: action.payload.id,
      };
    case 'REMOVE_RUNNING_SESSION_ID':
      return {
        ...state,
        ...defaultState,
      };
    default:
      return state;
  }
};

export default work;
