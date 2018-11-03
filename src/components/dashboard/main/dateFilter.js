import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DateRangeFilter } from '../../../shared/UI/pickers';
import { prettyDaysSpan } from '../../../shared/utils';

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  title: {
    color: 'black',
  },
  periodText: {
    color: 'gray',
    fontStyle: 'italic',
  },
});

// DICTIONARY
const title = 'Date filter';

const DateFilter = ({
  initialDate, endingDate, onChangeInitialDate, onChangeEndingDate, shortcuts,
}) => {
  const period = prettyDaysSpan(initialDate, endingDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.periodText}>
          {period}
        </Text>
      </View>
      <DateRangeFilter
        initialDate={initialDate}
        endingDate={endingDate}
        onChangeInitialDate={onChangeInitialDate}
        onChangeEndingDate={onChangeEndingDate}
        shortcuts={shortcuts}
      />
    </View>
  );
};

export default DateFilter;
