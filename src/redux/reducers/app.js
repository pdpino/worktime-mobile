export const defaultState = {
  storeVersion: 2,
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case 'APP/UPDATE_STORE':
      return {
        ...state,
        storeVersion: action.payload.nextStoreVersion,
      };
    default:
      return state;
  }
};

export default app;
