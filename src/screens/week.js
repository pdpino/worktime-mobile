import { createStackNavigator } from 'react-navigation-stack';
import WeekView from '../containers/week';
import headerOptions from './header';

const WeekStack = createStackNavigator({
  weekView: WeekView,
},
{
  initialRouteName: 'weekView',
  ...headerOptions,
});

export default WeekStack;
