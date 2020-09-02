import { TransitionSpecs } from 'react-navigation-stack';
import { colors } from '../shared/styles';

const headerOptions = {
  defaultNavigationOptions: {
    transitionSpec: {
      open: TransitionSpecs.FadeInFromBottomAndroidSpec,
      close: TransitionSpecs.FadeOutToBottomAndroidSpec,
    },
    headerStyle: {
      backgroundColor: colors.mainBlue,
      // NOTE: height must be set to avoid header displacement glitch
      height: 56,
    },
    headerTintColor: 'white',
    // NOTE: this avoids text displacement glitch
    headerStatusBarHeight: 0,
  },
  headerMode: 'float',
  mode: 'modal',
};

export default headerOptions;
