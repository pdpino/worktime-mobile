import { createStackNavigator } from 'react-navigation';
import Menu from './Menu';
import SubjectsList from './subjects/list';
import SubjectForm from './subjects/form';
import SubjectShow from './subjects/show';
import WorkPlayer from './work/player';

const Root = createStackNavigator({
  menu: {
    screen: Menu,
    navigationOptions: () => ({
      title: 'Worktime', // DICTIONARY
    }),
  },
  subjectsList: {
    screen: SubjectsList,
    navigationOptions: () => ({
      title: 'Subjects', // DICTIONARY
    }),
  },
  editSubject: {
    screen: SubjectForm,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.subject.name}`,
    }),
  },
  newSubject: {
    screen: SubjectForm,
    navigationOptions: () => ({
      title: 'New Subject', // DICTIONARY
    }),
  },
  subjectShow: {
    screen: SubjectShow,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.subject.name}`,
    }),
  },
  work: {
    screen: WorkPlayer,
    navigationOptions: () => ({
      title: 'Work', // DICTIONARY
    }),
  },
},
{
  initialRouteName: 'menu',
  navigationOptions: () => ({
    headerStyle: {
      backgroundColor: '#3B84B5',
    },
    headerTintColor: 'white',
  }),
});

export default Root;
