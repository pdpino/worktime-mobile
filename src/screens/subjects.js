import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NonArchivedSubjects, ArchivedSubjects,
  SubjectForm, SubjectShow, BulkSubjectForm,
} from '../containers/subjects';
import { CategoryForm } from '../containers/categories';
import headerOptions from './header';
import i18n from '../shared/i18n';

const Stack = createNativeStackNavigator();

export default function SubjectsStack() {
  return (
    <Stack.Navigator initialRouteName="base-subjectsCollection" {...headerOptions}>
      <Stack.Screen
        name="base-subjectsCollection"
        component={NonArchivedSubjects}
        options={{ title: i18n.t('entities.subjects') }}
      />
      <Stack.Screen
        name="subjectsArchiveCollection"
        component={ArchivedSubjects}
        options={{ title: i18n.t('archive') }}
      />
      <Stack.Screen
        name="newSubject"
        component={SubjectForm}
        options={{ title: i18n.t('entities.newSubject') }}
      />
      <Stack.Screen
        name="editSubject"
        component={SubjectForm}
        options={{ title: i18n.t('entities.editSubject') }}
      />
      <Stack.Screen name="showSubject" component={SubjectShow} />
      <Stack.Screen
        name="bulkEditSubject"
        component={BulkSubjectForm}
        options={{ title: i18n.t('entities.editSubjects') }}
      />
      <Stack.Screen
        name="newCategory"
        component={CategoryForm}
        options={{ title: i18n.t('entities.newCategory') }}
      />
      <Stack.Screen
        name="editCategory"
        component={CategoryForm}
        options={{ title: i18n.t('entities.editCategory') }}
      />
    </Stack.Navigator>
  );
}
