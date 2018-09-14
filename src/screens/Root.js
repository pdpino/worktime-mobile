import { createDrawerNavigator } from 'react-navigation';
import SubjectsStack from './subjects';
import WorkStack from './work';
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
  settings: {
    screen: SettingsStack,
    navigationOptions: () => ({
      drawerLabel: 'Settings', // DICTIONARY
    }),
  },
},
{
  initialRouteName: 'work',
});

export default Root;
