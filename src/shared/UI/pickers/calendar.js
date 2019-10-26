import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import asModalWithButton from './modalWithButton';
import { prettyDate } from '../../utils';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    marginHorizontal: 3,
  },
  buttonText: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
});

const formatDate = date => date && date.format('YYYY-MM-DD');

// DICTIONARY
const noneDateText = 'None';

const CalendarButton = ({ date, buttonContainerStyle }) => (
  <View style={[styles.buttonContainer, buttonContainerStyle]}>
    <Text style={styles.buttonText}>
      {date ? prettyDate(date, false) : noneDateText}
    </Text>
  </View>
);

const CalendarPicker = ({
  date, minDate, maxDate, onDayPress, closeModal,
}) => {
  const formattedCurrentDate = formatDate(date);

  return (
    <Calendar
      current={formattedCurrentDate}
      markedDates={{
        [formattedCurrentDate]: { selected: true },
      }}
      onDayPress={(day) => {
        closeModal();
        onDayPress(day);
      }}
      minDate={formatDate(minDate)}
      maxDate={formatDate(maxDate)}
      firstDay={1}
    />
  );
};

export default asModalWithButton(CalendarButton, CalendarPicker);
