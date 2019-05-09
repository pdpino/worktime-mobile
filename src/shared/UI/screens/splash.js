import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

const Splash = () => (
  <View style={styles.container}>
    <ActivityIndicator color="#3B84B5" size="large" />
  </View>
);

export default Splash;
