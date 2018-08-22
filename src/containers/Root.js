import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { HamburgerIcon } from '../shared/UI/icons';
import SubjectsList from './subjects/list';
import SubjectForm from './subjects/form';
import SubjectShow from './subjects/show';
import WorkPlayer from './work/player';

const headerOptions = {
  headerStyle: {
    backgroundColor: '#3B84B5',
  },
  headerTintColor: 'white',
};

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

const WorkStack = createStackNavigator({
  work: {
    screen: WorkPlayer,
    navigationOptions: ({ navigation }) => ({
      title: 'Work', // DICTIONARY
      headerLeft: <HamburgerIcon onPress={() => navigation.toggleDrawer()} />,
    }),
  },
},
{
  initialRouteName: 'work',
  navigationOptions: {
    ...headerOptions,
  },
});

const Root = createDrawerNavigator({
  subjects: {
    screen: SubjectsStack,
    navigationOptions: () => ({
      drawerLabel: 'Subjects', // DICTIONARY
    }),
  },
  work: {
    screen: WorkStack,
    navigationOptions: () => ({
      drawerLabel: 'Work', // DICTIONARY
    }),
  },
},
{
  initialRouteName: 'subjects',
});

export default Root;
