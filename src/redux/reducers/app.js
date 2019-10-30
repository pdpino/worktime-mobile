export const defaultState = {
  storeVersion: 0,
};

const app = (state = defaultState, action) => {
  if (action.type && action.type.startsWith('APP/UPDATE_STORE')) {
    return {
      ...state,
      storeVersion: action.payload.nextStoreVersion,
    };
  }
  return state;
};

export default app;
