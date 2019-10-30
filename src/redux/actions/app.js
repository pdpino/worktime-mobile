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
    for (let i = storeVersion; i + 1 <= storeVersionNeeded; i += 1) {
      const fromVersion = i;
      const toVersion = fromVersion + 1;
      dispatch({
        type: `APP/UPDATE_STORE_${fromVersion}_${toVersion}`,
        payload: {
          prevStoreVersion: fromVersion,
          nextStoreVersion: toVersion,
        },
      });
    }
    resolve();
  });
};
