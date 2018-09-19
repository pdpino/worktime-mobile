import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment'; // TODO: hide moment
import { CalendarPicker } from '.';

const styles = StyleSheet.create({
  container: { },
});

// DICTIONARY
const stringFrom = 'From';
const stringTo = 'To';

const DateRangeFilter = ({
  initialDate, endingDate, onChangeInitialDate, onChangeEndingDate,
}) => (
  <View style={styles.container}>
    <Text>
      {stringFrom}
    </Text>
    <CalendarPicker
      date={initialDate}
      maxDate={endingDate}
      onDayPress={day => onChangeInitialDate(day.dateString)}
    />
    <Text>
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
