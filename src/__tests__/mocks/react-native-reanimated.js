jest.mock(
  'react-native-reanimated',
  () => jest.requireActual('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests(),
);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
