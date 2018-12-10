const defaultState = {
  lastExportedTimestamp: 0,
};

const porting = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_EXPORT_TIMESTAMP':
      return {
        ...state,
        lastExportedTimestamp: action.payload.timestamp,
      };
    default:
      return state;
  }
};

export default porting;
