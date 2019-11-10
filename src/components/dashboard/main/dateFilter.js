import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { CalendarPicker } from '../../../shared/UI/pickers';

// COLORS
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    elevation: 2,
    backgroundColor: '#dedede',
    borderRadius: 2,
    borderColor: '#3B84B5',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  separatorContainer: {
    backgroundColor: '#3B84B5',
    paddingHorizontal: 8,
  },
  dateContainer: {
    paddingHorizontal: 3,
    paddingVertical: 5,
  },
});

class DateFilter extends React.PureComponent {
  render() {
    const {
      initialDate, endingDate, onChangeInitialDate, onChangeEndingDate,
    } = this.props;

    const separator = (
      <Icon
        containerStyle={styles.separatorContainer}
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
          buttonContainerStyle={styles.dateContainer}
          date={initialDate}
          maxDate={endingDate}
          onDayPress={onChangeInitialDate}
        />
        {separator}
        <CalendarPicker
          flex={1}
          buttonContainerStyle={styles.dateContainer}
          date={endingDate}
          minDate={initialDate}
          onDayPress={onChangeEndingDate}
        />
      </View>
    );
  }
}

export default DateFilter;
