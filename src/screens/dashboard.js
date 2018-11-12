import { createStackNavigator } from 'react-navigation';
import Dashboard from '../containers/dashboard/main';
import headerOptions from './header';

const DashboardStack = createStackNavigator({
  main: {
    screen: Dashboard,
    navigationOptions: {
      title: 'Dashboard', // DICTIONARY
    },
  },
},
{
  initialRouteName: 'main',
  navigationOptions: {
    ...headerOptions,
  },
});

export default DashboardStack;
