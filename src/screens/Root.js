import { createDrawerNavigator } from 'react-navigation';
import SubjectsStack from './subjects';
import WorkStack from './work';
import DashboardStack from './dashboard';
import SettingsStack from './settings';

const Root = createDrawerNavigator({
  subjects: {
    screen: SubjectsStack,
    navigationOptions: () => ({
      drawerLabel: 'Subjects', // DICTIONARY
    }),
  },
  work: {
    screen: WorkStack,
    navigationOptions: () => ({
      drawerLabel: 'Work', // DICTIONARY
    }),
  },
  dashboard: {
    screen: DashboardStack,
    navigationOptions: () => ({
      drawerLabel: 'Dashboard', // DICTIONARY
    }),
  },
  settings: {
    screen: SettingsStack,
    navigationOptions: () => ({
      drawerLabel: 'Settings', // DICTIONARY
    }),
  },
},
{
  initialRouteName: 'dashboard',
});

export default Root;
