import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import asModal from './modal';
import { prettyDate } from '../../utils';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

const formatDate = date => date && date.format('YYYY-MM-DD');

const CalendarButton = ({ date }) => (
  <View style={styles.button}>
    <Text>
      {prettyDate(date)}
    </Text>
  </View>
);

const CalendarPicker = ({
  date, minDate, maxDate, onDayPress, closeModal,
}) => (
  <Calendar
    markedDates={{
      [formatDate(date)]: { selected: true },
    }}
    onDayPress={(day) => {
      closeModal();
      onDayPress(day);
    }}
    minDate={formatDate(minDate)}
    maxDate={formatDate(maxDate)}
  />
);

export default asModal(CalendarButton, CalendarPicker);
