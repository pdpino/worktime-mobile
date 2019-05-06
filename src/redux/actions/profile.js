import { profileSelector } from '../selectors';

// eslint-disable-next-line import/prefer-default-export
export const updateDeviceName = newDeviceName => (dispatch, getState) => {
  const profile = profileSelector(getState());
  const oldDeviceName = profile.deviceName;
  if (oldDeviceName === newDeviceName) {
    return;
  }

  dispatch({
    type: 'UPDATE_DEVICE_NAME',
    payload: {
      oldDeviceName,
      newDeviceName,
    },
  });
};
