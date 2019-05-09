import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import asModalWithButton from './modalWithButton';
import { prettyDate } from '../../utils';

const styles = StyleSheet.create({
  button: {
    color: 'black',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  iconContainer: {
    marginLeft: 3,
    marginRight: 7,
  },
  buttonText: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
  },
});

const formatDate = date => date && date.format('YYYY-MM-DD');

// DICTIONARY
const noneDateText = 'None';

const CalendarButton = ({ date }) => (
  <View style={styles.button}>
    <Icon
      containerStyle={styles.iconContainer}
      name="calendar"
      type="font-awesome"
      size={17}
    />
    <Text style={styles.buttonText}>
      {date ? prettyDate(date) : noneDateText}
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
