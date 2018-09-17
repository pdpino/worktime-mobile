import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HamburgerIcon } from '../shared/UI/icons';
import Dashboard from '../containers/dashboard/main';
import headerOptions from './header';

const DashboardStack = createStackNavigator({
  main: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      title: 'Dashboard', // DICTIONARY
      headerLeft: <HamburgerIcon onPress={() => navigation.toggleDrawer()} />,
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
