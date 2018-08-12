const defaultState = {
  isWorking: false,
};

const working = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_WORKING':
      return {
        ...state,
        isWorking: true,
      };
    case 'STOP_WORKING':
      return {
        ...state,
        isWorking: false,
      };
    default:
      return state;
  }
};

export default working;
