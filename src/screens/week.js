import { createStackNavigator } from 'react-navigation';
import WeekView from '../containers/week';
import headerOptions from './header';

const WeekStack = createStackNavigator({
  weekView: WeekView,
},
{
  initialRouteName: 'weekView',
  navigationOptions: {
    ...headerOptions,
  },
});

export default WeekStack;
