import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HamburgerIcon } from '../shared/UI/icons';
import WorkPlayer from '../containers/work/player';
import headerOptions from './header';

const WorkStack = createStackNavigator({
  work: {
    screen: WorkPlayer,
    navigationOptions: ({ navigation }) => ({
      title: 'Work', // DICTIONARY
      headerLeft: <HamburgerIcon onPress={() => navigation.toggleDrawer()} />,
    }),
  },
},
{
  initialRouteName: 'work',
  navigationOptions: {
    ...headerOptions,
  },
});

export default WorkStack;
