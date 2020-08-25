import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../containers/dashboard';
import headerOptions from './header';
import i18n from '../shared/i18n';

const DashboardStack = createStackNavigator({
  main: {
    screen: Dashboard,
    navigationOptions: () => ({
      title: i18n.t('dashboard'),
    }),
  },
},
{
  initialRouteName: 'main',
  defaultNavigationOptions: {
    ...headerOptions,
  },
});

export default DashboardStack;
