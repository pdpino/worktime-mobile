import { createStackNavigator } from 'react-navigation';
import Menu from './Menu';
import SubjectsList from './subjects/list';
import SubjectForm from './subjects/form';
import WorkSelectSubject from './work/SubjectsList';
import WorkSessionsList from './workSessions/list';
import WorkPlayer from './work/player';

const Root = createStackNavigator({
  menu: {
    screen: Menu,
    navigationOptions: () => ({
      title: 'Worktime', // DICTIONARY
    }),
  },
  subjects: {
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
  workSelectSubject: {
    screen: WorkSelectSubject,
    navigationOptions: () => ({
      title: 'Work in:', // DICTIONARY
    }),
  },
  workSessions: {
    screen: WorkSessionsList,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.subject.name}'s sessions`, // DICTIONARY
    }),
  },
  work: {
    screen: WorkPlayer,
    navigationOptions: ({ navigation }) => ({
      title: `Work on ${navigation.state.params.subject.name}`, // DICTIONARY
    }),
  },
},
{
  initialRouteName: 'menu',
});

export default Root;
