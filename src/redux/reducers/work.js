const defaultState = {
  lastRunningSessionId: -1,
  runningSessionId: -1,
  selectedSubjectId: -1,
};

const work = (state = defaultState, action) => {
  switch (action.type) {
    case 'PLAYER/STARTED':
      return {
        ...state,
        runningSessionId: action.payload.runningSessionId,
      };
    case 'PLAYER/STOP':
    case 'PLAYER/STOP_DISCARD':
      return {
        ...state,
        runningSessionId: -1,
        lastRunningSessionId: action.payload.runningSessionId,
      };
    case 'SELECT_WORK_SUBJECT':
      return {
        ...state,
        selectedSubjectId: action.payload.selectedSubjectId,
      };
    case 'ARCHIVE_SUBJECTS':
    case 'DELETE_SUBJECTS': {
      const { ids } = action.payload;
      if (ids && ids.includes(state.selectedSubjectId.toString())) {
        return {
          ...state,
          selectedSubjectId: -1,
          runningSessionId: -1,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default work;
