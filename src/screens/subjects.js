import { createStackNavigator } from 'react-navigation';
import {
  createSubjectsList, SubjectForm, SubjectShow, BulkSubjectForm,
} from '../containers/subjects';
import { CategoryForm } from '../containers/categories';
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
  categoryForm: CategoryForm,
  bulkEditSubject: {
    screen: BulkSubjectForm,
    navigationOptions: {
      title: 'Edit Subjects', // DICTIONARY
    },
  },
},
{
  initialRouteName: 'subjectsList',
  navigationOptions: {
    ...headerOptions,
  },
});

export default SubjectsStack;
