import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import asModalWithButton from './modalWithButton';
import { prettyDate, dateToDateString, getDate } from '../../dates';
import i18n from '../../i18n';

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

const CalendarButton = ({ date, buttonContainerStyle }) => (
  <View style={[styles.buttonContainer, buttonContainerStyle]}>
    <Text style={styles.buttonText}>
      {date ? prettyDate(date, false) : i18n.t('none')}
    </Text>
  </View>
);

const CalendarPicker = ({
  date, minDate, maxDate, onDayPress, closeModal,
}) => {
  const formattedCurrentDate = dateToDateString(date);

  return (
    <Calendar
      current={formattedCurrentDate}
      markedDates={{
        [formattedCurrentDate]: { selected: true },
      }}
      onDayPress={(datePressed) => {
        const { day, month, year } = datePressed;
        closeModal();
        onDayPress(getDate(year, month, day));
      }}
      minDate={dateToDateString(minDate)}
      maxDate={dateToDateString(maxDate)}
      firstDay={1}
    />
  );
};

export default asModalWithButton(CalendarButton, CalendarPicker);
