import React from 'react';
import { View } from 'react-native';
import WeekView from './main';
import NDaysPicker from './nDaysPicker';

const WeekViewWrapper = ({ children, ...props }) => (
  <View style={{ flex: 1 }}>
    <WeekView {...props} />
    {children}
  </View>
);

export default WeekViewWrapper;

export {
  NDaysPicker,
};
