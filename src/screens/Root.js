import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SubjectsStack from './subjects';
import WorkStack from './work';
import DashboardStack from './dashboard';
import SettingsStack from './settings';

const iconConfiguration = {
  subjects: {
    name: 'list',
    type: 'feather',
  },
  work: {
    name: 'play',
    type: 'font-awesome',
    size: 20,
  },
  dashboard: {
    name: 'dashboard',
    type: 'font-awesome',
  },
  settings: {
    name: 'settings',
    type: 'material',
  },
};

const Root = createBottomTabNavigator({
  subjects: {
    screen: SubjectsStack,
    navigationOptions: {
      tabBarLabel: 'Subjects', // DICTIONARY
    },
  },
  work: {
    screen: WorkStack,
    navigationOptions: {
      tabBarLabel: 'Work', // DICTIONARY
    },
  },
  dashboard: {
    screen: DashboardStack,
    navigationOptions: {
      tabBarLabel: 'Dashboard', // DICTIONARY
    },
  },
  settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings', // DICTIONARY
    },
  },
},
{
  initialRouteName: 'dashboard',
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      return <Icon color={tintColor} size={22} {...iconConfiguration[routeName]} />;
    },
  }),
});

export default Root;
