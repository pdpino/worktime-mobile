import React from 'react';
import { StyleSheet, View } from 'react-native';
import SubjectsCollection from './subjectsCollection';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});

const SubjectsCollectionWrapper = ({ children, ...props }) => (
  <View style={styles.container}>
    <SubjectsCollection {...props} />
    {children}
  </View>
);

export default SubjectsCollectionWrapper;
