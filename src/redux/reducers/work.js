const defaultState = {
  runningSessionId: -1,
  selectedSubjectId: -1,
};

const work = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_RUNNING_SESSION_ID':
      return {
        ...state,
        runningSessionId: action.payload.runningSessionId,
      };
    case 'STOP':
      return {
        ...state,
        runningSessionId: -1,
      };
    case 'SELECT_WORK_SUBJECT':
      return {
        ...state,
        selectedSubjectId: action.payload.selectedSubjectId,
      };
    case 'DELETE_SUBJECT':
      if (action.payload.id === state.selectedSubjectId) {
        return {
          ...state,
          selectedSubjectId: -1,
          runningSessionId: -1,
        };
      }
      return state;
    default:
      return state;
  }
};

export default work;
