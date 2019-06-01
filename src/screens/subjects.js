import { createStackNavigator } from 'react-navigation';
import { createSubjectsList, SubjectForm, SubjectShow } from '../containers/subjects';
import headerOptions from './header';

const SubjectsStack = createStackNavigator({
  subjectsList: {
    screen: createSubjectsList(false),
  },
  subjectsArchiveList: {
    screen: createSubjectsList(true),
  },
  newSubject: {
    screen: SubjectForm,
    navigationOptions: {
      title: 'New Subject', // DICTIONARY
    },
  },
  editSubject: {
    screen: SubjectForm,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.subject.name}`,
    }),
  },
  showSubject: {
    screen: SubjectShow,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.subject.name}`,
    }),
  },
},
{
  initialRouteName: 'subjectsList',
  navigationOptions: {
    ...headerOptions,
  },
});

export default SubjectsStack;
