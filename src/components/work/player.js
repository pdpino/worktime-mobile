import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const WorkPlayer = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

export default WorkPlayer;
