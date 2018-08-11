import { createStackNavigator } from 'react-navigation';
import MenuContainer from './Menu';
import SubjectsListContainer from './subjects/list';
import SubjectShowContainer from './subjects/show';

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
      title: 'Subjects', // DICTIONARY
    }),
  },
  subject: {
    screen: SubjectShowContainer,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.subject.name}`,
    }),
  },
},
{
  initialRouteName: 'menu',
});

export default Root;
