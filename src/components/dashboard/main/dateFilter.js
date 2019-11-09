import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { CalendarPicker } from '../../../shared/UI/pickers';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  separatorContainer: {
    backgroundColor: '#3B84B5',
  },
  box: {
    borderColor: '#3B84B5',
    borderWidth: 2,
    paddingHorizontal: 3,
    paddingVertical: 6,
  },
  calendarLeft: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  calendarRight: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
});

const DateFilter = ({
  initialDate, endingDate, onChangeInitialDate, onChangeEndingDate,
}) => {
  const separator = (
    <Icon
      containerStyle={[styles.box, styles.separatorContainer]}
      name="calendar"
      type="font-awesome"
      size={18}
      color="white"
    />
  );

  return (
    <View style={styles.container}>
      <CalendarPicker
        flex={1}
        buttonContainerStyle={[styles.box, styles.calendarLeft]}
        date={initialDate}
        maxDate={endingDate}
        onDayPress={onChangeInitialDate}
      />
      {separator}
      <CalendarPicker
        flex={1}
        buttonContainerStyle={[styles.box, styles.calendarRight]}
        date={endingDate}
        minDate={initialDate}
        onDayPress={onChangeEndingDate}
      />
    </View>
  );
};

export default DateFilter;
