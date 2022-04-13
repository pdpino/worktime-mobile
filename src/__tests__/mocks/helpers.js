const navigationMock = () => ({
  navigate: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  setOptions: jest.fn(),
});

const routeMock = () => ({
  params: jest.mock(),
});

const helpers = {
  Navigation: navigationMock,
  Route: routeMock,
  NavigationProps: () => ({
    navigation: navigationMock(),
    route: routeMock(),
  }),
};

export default helpers;
