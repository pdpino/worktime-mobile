import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SubjectInfo from './info';
import SubjectTimesSummary from './timesSummary';
import GoToWorkSessions from './gotows';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
});

const SubjectShowComponent = ({ children }) => (
  <ScrollView style={styles.container}>
    {children}
  </ScrollView>
);

export {
  SubjectInfo,
  SubjectTimesSummary,
  SubjectShowComponent,
  GoToWorkSessions,
};
