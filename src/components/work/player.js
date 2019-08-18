import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const WorkPlayer = ({ children }) => (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
    {children}
  </ScrollView>
);

export default WorkPlayer;
