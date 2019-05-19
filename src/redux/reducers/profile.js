const defaultState = {
  deviceName: 'mobile',
  knownDevices: {},
};

const profile = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_DEVICE_NAME':
      return {
        ...state,
        deviceName: action.payload.newDeviceName,
      };
    case 'IMPORT_SUBJECTS_DATA': {
      const { device, timestamp } = action.payload;
      return {
        ...state,
        knownDevices: {
          ...state.knownDevices,
          [device]: timestamp,
        },
      };
    }
    default:
      return state;
  }
};

export default profile;
