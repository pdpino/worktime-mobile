import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment'; // TODO: hide moment
import { CalendarPicker } from '.';

const styles = StyleSheet.create({
  container: { },
});

const DateRangeFilter = ({
  initialDate, endingDate, onChangeInitialDate, onChangeEndingDate,
}) => (
  <View style={styles.container}>
    <Text>
      From
    </Text>
    <CalendarPicker
      date={initialDate}
      maxDate={endingDate}
      onDayPress={day => onChangeInitialDate(day.dateString)}
    />
    <Text>
      To
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
