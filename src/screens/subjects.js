import { createStackNavigator } from 'react-navigation';
import { SubjectsList, SubjectForm, SubjectShow } from '../containers/subjects';
import headerOptions from './header';

const SubjectsStack = createStackNavigator({
  subjectsList: {
    screen: SubjectsList,
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
