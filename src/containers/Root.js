import { createStackNavigator } from 'react-navigation';
import MenuContainer from './Menu';
import SubjectsListContainer from './subjects/list';
import SubjectFormContainer from './subjects/form';

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
    screen: SubjectFormContainer,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.subject.name}`,
    }),
  },
  newSubject: {
    screen: SubjectFormContainer,
    navigationOptions: () => ({
      title: 'New Subject', // DICTIONARY
    }),
  },
},
{
  initialRouteName: 'menu',
});

export default Root;
