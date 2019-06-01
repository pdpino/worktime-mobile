import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});

const SubjectsListComponent = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

export default SubjectsListComponent;
