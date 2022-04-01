import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import SubjectsStack from './subjects';
import WorkStack from './work';
import DashboardStack from './dashboard';
import SettingsStack from './settings';
// import WeekStack from './week';
import TimeChartStack from './timeChart';
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
  timeChart: {
    name: 'linechart',
    type: 'antdesign',
  },
};

const Tab = createBottomTabNavigator();

export default function Root() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="timeChart"
        screenOptions={({ route }) => {
          const stackRoute = getFocusedRouteNameFromRoute(route);
          return {
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon color={color} size={22} {...iconConfiguration[route.name]} />
            ),
            // hacky way to only display tab in the first screen of the stack
            tabBarStyle: !stackRoute || stackRoute.includes('base-')
              ? {} : { display: 'none' },
            headerStyle: { height: 0 },
          };
        }}
      >
        <Tab.Screen
          name="subjects"
          component={SubjectsStack}
          options={{ tabBarLabel: i18n.t('entities.subjects') }}
        />
        <Tab.Screen
          name="work"
          component={WorkStack}
          options={{ tabBarLabel: i18n.t('work') }}
        />
        <Tab.Screen
          name="dashboard"
          component={DashboardStack}
          options={{ tabBarLabel: i18n.t('dashboard') }}
        />
        <Tab.Screen
          name="timeChart"
          component={TimeChartStack}
          options={{ tabBarLabel: i18n.t('trend') }}
        />
        <Tab.Screen
          name="settings"
          component={SettingsStack}
          options={{ tabBarLabel: i18n.t('settings') }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* FOR NOW:
        <Tab.Screen
          name="week"
          component={WeekStack}
          options={{ tabBarLabel: i18n.t('week') }}
        />
        */
