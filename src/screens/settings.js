import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HamburgerIcon } from '../shared/UI/icons';
import SettingsMenu from '../containers/settings/menu';
import headerOptions from './header';

const SettingsStack = createStackNavigator({
  menu: {
    screen: SettingsMenu,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings', // DICTIONARY
      headerLeft: <HamburgerIcon onPress={() => navigation.toggleDrawer()} />,
    }),
  },
},
{
  initialRouteName: 'menu',
  navigationOptions: {
    ...headerOptions,
  },
});

export default SettingsStack;
