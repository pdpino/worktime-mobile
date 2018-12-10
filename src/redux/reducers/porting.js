const defaultState = {
  lastExportedTimestamp: 0,
};

const porting = (state = defaultState, action) => {
  switch (action.type) {
    case 'TODO':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default porting;
