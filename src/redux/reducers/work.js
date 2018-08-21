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
    case 'REMOVE_RUNNING_SESSION_ID':
      return {
        ...state,
        runningSessionId: -1,
      };
    case 'SELECT_WORK_SUBJECT':
      return {
        ...state,
        selectedSubjectId: action.payload.selectedSubjectId,
      };
    default:
      return state;
  }
};

export default work;
