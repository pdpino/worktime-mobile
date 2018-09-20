import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DateRangeFilter } from '../../../shared/UI/pickers';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 7,
    paddingHorizontal: 5,
    paddingTop: 3,
    paddingBottom: 8,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    marginBottom: 3,
  },
});

// DICTIONARY
const title = 'Date filter';

const DateFilter = ({
  initialDate, endingDate, onChangeInitialDate, onChangeEndingDate,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>
      {title}
    </Text>
    <DateRangeFilter
      initialDate={initialDate}
      endingDate={endingDate}
      onChangeInitialDate={onChangeInitialDate}
      onChangeEndingDate={onChangeEndingDate}
    />
  </View>
);

export default DateFilter;
