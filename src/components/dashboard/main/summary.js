import React from 'react';
import {
  StyleSheet, View, Text, ActivityIndicator,
} from 'react-native';
import {
  prettyDuration, prettyDays, prettyWeeks, prettyPercentage,
} from '../../../shared/utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 7,
    marginVertical: 7,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  title: {
    color: 'black',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  box: {
    flexDirection: 'column',
    margin: 5,
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
  },
  totalValues: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 3,
  },
  effectiveValues: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabel: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 5,
  },
  daysValues: {
    color: 'black',
    fontSize: 18,
  },
  loading: {
    height: 83, // HACK: value hardcoded, equal to height when displaying text
  },
});

// DICTIONARY
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';
const title = 'Summary';
const workedLabel = 'worked';
const perDayLabel = 'per day';
const perWeekLabel = 'per week';

const Summary = ({ timeStats, isLoading }) => {
  const {
    timeTotal, timeEffective, nDaysWorked, dayAvg, nWeeksWorked, weekAvg,
  } = timeStats;

  const totalBox = (
    <View style={styles.box}>
      <Text style={styles.textTitle}>
        {timeTotalLabel}
      </Text>
      <Text style={styles.totalValues}>
        {prettyDuration(timeTotal)}
      </Text>
    </View>
  );

  const effectiveBox = (
    <View style={styles.box}>
      <Text style={styles.textTitle}>
        {timeEffectiveLabel}
      </Text>
      <Text style={styles.effectiveValues}>
        {prettyDuration(timeEffective)}
      </Text>
      <Text style={styles.effectiveValues}>
        {prettyPercentage(timeEffective, timeTotal)}
      </Text>
    </View>
  );

  const getDaysRow = (value, label) => (
    <View style={styles.daysRow}>
      <Text style={styles.daysValues}>
        {value}
      </Text>
      <Text style={styles.textLabel}>
        {label}
      </Text>
    </View>
  );

  const detailBox = (nWeeksWorked <= 1) ? (
    <View style={styles.box}>
      {getDaysRow(prettyDays(nDaysWorked), workedLabel)}
      {getDaysRow(prettyDuration(dayAvg), perDayLabel)}
    </View>
  ) : (
    <View style={styles.box}>
      {getDaysRow(prettyWeeks(nWeeksWorked), workedLabel)}
      {getDaysRow(prettyDuration(weekAvg), perWeekLabel)}
    </View>
  );

  const loadingWheel = (
    <View style={[styles.subContainer, styles.loading]}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      {isLoading ? loadingWheel : (
        <View style={styles.subContainer}>
          {totalBox}
          {effectiveBox}
          {detailBox}
        </View>
      )}
    </View>
  );
};

export default Summary;
