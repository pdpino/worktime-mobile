import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 25,
    paddingHorizontal: 20,
  },
});

const WorkPlayer = ({ children }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    {children}
  </ScrollView>
);

export default WorkPlayer;
