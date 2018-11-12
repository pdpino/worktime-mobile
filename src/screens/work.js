import { createStackNavigator } from 'react-navigation';
import WorkPlayer from '../containers/work/player';
import headerOptions from './header';

const WorkStack = createStackNavigator({
  work: {
    screen: WorkPlayer,
    navigationOptions: {
      title: 'Work', // DICTIONARY
    },
  },
},
{
  initialRouteName: 'work',
  navigationOptions: {
    ...headerOptions,
  },
});

export default WorkStack;
