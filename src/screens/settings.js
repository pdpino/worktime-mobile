import { createStackNavigator } from 'react-navigation';
import SettingsMenu from '../containers/settings/menu';
import Exporting from '../containers/settings/exporting';
import headerOptions from './header';

const SettingsStack = createStackNavigator({
  menu: {
    screen: SettingsMenu,
    navigationOptions: {
      title: 'Settings', // DICTIONARY
    },
  },
  exporting: {
    screen: Exporting,
    navigationOptions: {
      title: 'Export data', // DICTIONARY
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
