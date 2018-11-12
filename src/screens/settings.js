import { createStackNavigator } from 'react-navigation';
import SettingsMenu from '../containers/settings/menu';
import headerOptions from './header';

const SettingsStack = createStackNavigator({
  menu: {
    screen: SettingsMenu,
    navigationOptions: {
      title: 'Settings', // DICTIONARY
    },
  },
},
{
  initialRouteName: 'menu',
  navigationOptions: {
    ...headerOptions,
  },
});

export default SettingsStack;
