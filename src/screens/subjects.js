import { createStackNavigator } from 'react-navigation-stack';
import {
  createSubjectsCollection, SubjectForm, SubjectShow, BulkSubjectForm,
} from '../containers/subjects';
import { CategoryForm } from '../containers/categories';
import headerOptions from './header';

const SubjectsStack = createStackNavigator({
  subjectsCollection: createSubjectsCollection(false),
  subjectsArchiveCollection: createSubjectsCollection(true),
  newSubject: SubjectForm,
  editSubject: SubjectForm,
  showSubject: SubjectShow,
  categoryForm: CategoryForm,
  bulkEditSubject: BulkSubjectForm,
},
{
  initialRouteName: 'subjectsCollection',
  defaultNavigationOptions: {
    ...headerOptions,
  },
});

export default SubjectsStack;
