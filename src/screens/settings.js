import { createStackNavigator } from 'react-navigation-stack';
import SettingsMenu from '../containers/settings/menu';
import Profile from '../containers/settings/profile';
import Exporting from '../containers/settings/exporting';
import Importing from '../containers/settings/importing';
import headerOptions from './header';
import i18n from '../shared/i18n';

const SettingsStack = createStackNavigator({
  menu: {
    screen: SettingsMenu,
    navigationOptions: () => ({
      title: i18n.t('settings'),
    }),
  },
  profile: {
    screen: Profile,
    navigationOptions: () => ({
      title: i18n.t('profile'),
    }),
  },
  exporting: {
    screen: Exporting,
    navigationOptions: () => ({
      title: i18n.t('porting.exportData'),
    }),
  },
  importing: {
    screen: Importing,
    navigationOptions: () => ({
      title: i18n.t('porting.importData'),
    }),
  },
},
{
  initialRouteName: 'menu',
  defaultNavigationOptions: {
    ...headerOptions,
  },
});

export default SettingsStack;
