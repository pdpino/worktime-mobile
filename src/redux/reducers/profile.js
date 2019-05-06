const defaultState = {
  deviceName: 'mobile',
};

const profile = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_DEVICE_NAME':
      return {
        ...state,
        deviceName: action.payload.newDeviceName,
      };
    default:
      return state;
  }
};

export default profile;
