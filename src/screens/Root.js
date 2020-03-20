import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SubjectsStack from './subjects';
import WorkStack from './work';
import DashboardStack from './dashboard';
import SettingsStack from './settings';
import WeekStack from './week';
import i18n from '../shared/i18n';

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
  week: {
    name: 'view-week',
    type: 'material',
  },
  settings: {
    name: 'settings',
    type: 'material',
  },
};

const Root = createBottomTabNavigator({
  subjects: {
    screen: SubjectsStack,
    navigationOptions: () => ({
      tabBarLabel: i18n.t('entities.subjects'),
    }),
  },
  work: {
    screen: WorkStack,
    navigationOptions: () => ({
      tabBarLabel: i18n.t('work'),
    }),
  },
  dashboard: {
    screen: DashboardStack,
    navigationOptions: () => ({
      tabBarLabel: i18n.t('dashboard'),
    }),
  },
  week: {
    screen: WeekStack,
    navigationOptions: () => ({
      tabBarLabel: i18n.t('week'),
    }),
  },
  settings: {
    screen: SettingsStack,
    navigationOptions: () => ({
      tabBarLabel: i18n.t('settings'),
    }),
  },
},
{
  initialRouteName: 'week',
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index === 0,
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      return (
        <Icon color={tintColor} size={22} {...iconConfiguration[routeName]} />
      );
    },
  }),
});

export default Root;
