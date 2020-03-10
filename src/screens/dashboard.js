import { createStackNavigator } from 'react-navigation';
import Dashboard from '../containers/dashboard/main';
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
  navigationOptions: {
    ...headerOptions,
  },
});

export default DashboardStack;
