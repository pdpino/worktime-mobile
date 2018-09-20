import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment'; // TODO: hide moment
import { CalendarPicker } from '.';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 5,
  },
});

// DICTIONARY
const stringFrom = 'From';
const stringTo = 'To';

const DateRangeFilter = ({
  initialDate, endingDate, onChangeInitialDate, onChangeEndingDate,
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {stringFrom}
    </Text>
    <CalendarPicker
      date={initialDate}
      maxDate={endingDate}
      onDayPress={day => onChangeInitialDate(day.dateString)}
    />
    <Text style={styles.text}>
      {stringTo}
    </Text>
    <CalendarPicker
      date={endingDate}
      minDate={initialDate}
      maxDate={moment()}
      onDayPress={day => onChangeEndingDate(day.dateString)}
    />
  </View>
);

export default DateRangeFilter;
