import { TransitionPresets } from 'react-navigation-stack';
import { colors } from '../shared/styles';

const headerOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.mainBlue,
      // NOTE: height must be set to avoid header displacement glitch
      height: 56,
    },
    headerTintColor: 'white',
    // NOTE: this avoids text displacement glitch
    headerStatusBarHeight: 0,
    // NOTE: Use this to avoid weird elastic behavior on android >= 9
    ...TransitionPresets.FadeFromBottomAndroid,
  },
  headerMode: 'screen',
};

export default headerOptions;
