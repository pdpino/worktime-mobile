export const onAppActivate = () => ({
  type: 'APP/ACTIVATE',
  payload: {},
});

export const onAppDeactivate = () => ({
  type: 'APP/DEACTIVATE',
  payload: {},
});

export const checkStoreVersion = storeVersionNeeded => (dispatch, getState) => {
  const { storeVersion } = getState().app;

  if (storeVersion === storeVersionNeeded) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    dispatch({
      type: 'APP/UPDATE_STORE',
      payload: {
        prevStoreVersion: storeVersion,
        nextStoreVersion: storeVersionNeeded,
      },
    });
    resolve();
  });
};
