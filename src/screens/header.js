import { colors } from '../shared/styles';

const headerOptions = {
  headerStyle: {
    backgroundColor: colors.mainBlue,
    // NOTE: height must be set to avoid header displacement glitch
    height: 56,
  },
  headerTintColor: 'white',
  // NOTE: this avoids text displacement glitch
  headerStatusBarHeight: 0,
};

export default headerOptions;
