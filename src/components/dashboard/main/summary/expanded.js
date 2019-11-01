import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import {
  prettyDuration, prettyDays, prettyWeeks, prettyPercentage, prettyDate,
  isSameDay,
} from '../../../../shared/utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 3,
  },
  rowLabel: {
    fontSize: 16,
    fontStyle: 'italic',
    marginRight: 15,
  },
  rowItem: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowValue: {
    fontSize: 16,
    color: 'black',
  },
  rowSuffix: {
    marginLeft: 5,
  },
});

// DICTIONARY
const dictPercentage = 'Effective time';
const dictWorked = 'worked';
const dictPerDay = 'per day';
const dictPerWeek = 'per week';
const dictFirstDay = 'First day worked';
const dictLastDay = 'Last day worked';


const ExpandedSummary = ({ timeStats, initialDate, endingDate }) => {
  const {
    timeTotal, timeEffective, nDaysWorked, dayAvg, nWeeksWorked, weekAvg,
    firstDate, lastDate,
  } = timeStats;

  const percentage = prettyPercentage(timeEffective, timeTotal);

  const getSimpleRow = (label, value) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>
        {label}
        :
      </Text>
      <Text style={styles.rowValue}>
        {value}
      </Text>
    </View>
  );

  const getMultipleRow = (label, values) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>
        {label}
        :
      </Text>
      {values.map(({ prefix, suffix }, index) => (
        <View style={styles.rowItem} key={index.toString()}>
          {prefix && (
            <Text style={styles.rowValue}>
              {prefix}
            </Text>
          )}
          {suffix && (
            <Text style={styles.rowSuffix}>
              {suffix}
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  const daysRow = getMultipleRow('Daily', [
    {
      prefix: prettyDuration(dayAvg),
      suffix: dictPerDay,
    },
    {
      prefix: prettyDays(nDaysWorked),
      suffix: dictWorked,
    },
  ]);

  const weeksRow = getMultipleRow('Weekly', [
    {
      prefix: prettyDuration(weekAvg),
      suffix: dictPerWeek,
    },
    {
      prefix: prettyWeeks(nWeeksWorked),
      suffix: dictWorked,
    },
  ]);

  const showFirstDate = firstDate
    && (!initialDate || !isSameDay(initialDate, firstDate));
  const showLastDate = lastDate && !isSameDay(endingDate, lastDate);

  return (
    <View style={styles.container}>
      {getSimpleRow(dictPercentage, percentage)}
      {daysRow}
      {weeksRow}
      {showFirstDate && getSimpleRow(dictFirstDay, prettyDate(firstDate))}
      {showLastDate && getSimpleRow(dictLastDay, prettyDate(lastDate))}
    </View>
  );
};

export default ExpandedSummary;
