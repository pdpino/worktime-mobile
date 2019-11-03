import { createStackNavigator } from 'react-navigation';
import {
  createSubjectsList, SubjectForm, SubjectShow, BulkSubjectForm,
} from '../containers/subjects';
import { CategoryForm } from '../containers/categories';
import headerOptions from './header';

const SubjectsStack = createStackNavigator({
  subjectsList: createSubjectsList(false),
  subjectsArchiveList: createSubjectsList(true),
  newSubject: SubjectForm,
  editSubject: SubjectForm,
  showSubject: SubjectShow,
  categoryForm: CategoryForm,
  bulkEditSubject: BulkSubjectForm,
},
{
  initialRouteName: 'subjectsList',
  navigationOptions: {
    ...headerOptions,
  },
});

export default SubjectsStack;
