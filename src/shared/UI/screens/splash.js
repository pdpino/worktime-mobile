import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../styles';

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
    <ActivityIndicator color={colors.spinner} size="large" />
  </View>
);

export default Splash;
