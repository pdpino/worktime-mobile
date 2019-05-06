const defaultState = {
  lastExportedTimestamp: 0, // TODO: delete if not used
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
