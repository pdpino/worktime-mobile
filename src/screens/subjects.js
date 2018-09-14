import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HamburgerIcon } from '../shared/UI/icons';
import { SubjectsList, SubjectForm, SubjectShow } from '../containers/subjects';
import headerOptions from './header';

const SubjectsStack = createStackNavigator({
  subjectsList: {
    screen: SubjectsList,
    navigationOptions: ({ navigation }) => ({
      title: 'Subjects', // DICTIONARY
      headerLeft: <HamburgerIcon onPress={() => navigation.toggleDrawer()} />,
    }),
  },
  newSubject: {
    screen: SubjectForm,
    navigationOptions: () => ({
      title: 'New Subject', // DICTIONARY
    }),
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
