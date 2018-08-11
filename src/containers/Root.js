import { createStackNavigator } from 'react-navigation';
import MenuContainer from './Menu';
import SubjectsListContainer from './SubjectsList';

const Root = createStackNavigator({
  menu: {
    screen: MenuContainer,
    navigationOptions: () => ({
      title: 'Worktime', // DICTIONARY
    }),
  },
  subjects: {
    screen: SubjectsListContainer,
    navigationOptions: () => ({
      // title: `${navigation.state.params.name}'s Profile'`,
      title: 'Subjects', // DICTIONARY
    }),
  },
},
{
  initialRouteName: 'menu',
});

export default Root;
