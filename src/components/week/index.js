import React from 'react';
import { View, StyleSheet } from 'react-native';
import Week from './week';
import NDaysPicker from './nDaysPicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const WeekViewComponent = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

export {
  Week,
  NDaysPicker,
  WeekViewComponent,
};
