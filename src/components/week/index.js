import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeekView from './main';
import NDaysPicker from './nDaysPicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

const WeekViewWrapper = ({ children, ...props }) => (
  <View style={styles.container}>
    <WeekView {...props} />
    {children}
  </View>
);

export default WeekViewWrapper;

export {
  NDaysPicker,
};
