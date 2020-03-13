jest.mock('react-native-device-info', () => ({
  getModel: jest.fn(),
  getVersion: jest.fn(() => '1.2.3'),
}));
