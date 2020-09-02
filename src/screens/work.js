import { createStackNavigator } from 'react-navigation-stack';
import WorkPlayer from '../containers/work/player';
import headerOptions from './header';
import i18n from '../shared/i18n';

const WorkStack = createStackNavigator({
  work: {
    screen: WorkPlayer,
    navigationOptions: () => ({
      title: i18n.t('work'),
    }),
  },
},
{
  initialRouteName: 'work',
  ...headerOptions,
});

export default WorkStack;
