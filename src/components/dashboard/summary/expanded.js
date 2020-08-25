import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { prettyPercentage } from '../../../shared/utils';
import {
  prettyDate, prettyDuration, prettyDays, prettyWeeks, isSameDay,
} from '../../../shared/dates';
import i18n from '../../../shared/i18n';

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

  const daysRow = getMultipleRow(i18n.t('datePeriods.daily'), [
    {
      prefix: prettyDuration(dayAvg),
      suffix: i18n.t('times.perDay'),
    },
    {
      prefix: prettyDays(nDaysWorked),
      suffix: i18n.t('times.worked', { count: nDaysWorked }),
    },
  ]);

  const weeksRow = getMultipleRow(i18n.t('datePeriods.weekly'), [
    {
      prefix: prettyDuration(weekAvg),
      suffix: i18n.t('times.perWeek'),
    },
    {
      prefix: prettyWeeks(nWeeksWorked),
      suffix: i18n.t('times.worked', { count: nWeeksWorked }),
    },
  ]);

  const showFirstDate = firstDate
    && (!initialDate || !isSameDay(initialDate, firstDate));
  const showLastDate = lastDate && !isSameDay(endingDate, lastDate);

  return (
    <View style={styles.container}>
      {getSimpleRow(i18n.t('times.effectiveTime'), percentage)}
      {daysRow}
      {weeksRow}
      {showFirstDate && getSimpleRow(
        i18n.t('times.firstDayWorked'),
        prettyDate(firstDate),
      )}
      {showLastDate && getSimpleRow(
        i18n.t('times.lastDayWorked'),
        prettyDate(lastDate),
      )}
    </View>
  );
};

export default ExpandedSummary;
