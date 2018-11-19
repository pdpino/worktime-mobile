import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  prettyDuration, prettyDays, prettyPercentage,
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
    margin: 10,
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 10,
  },
  totalValues: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 3,
  },
  effectiveValues: {
    color: 'black',
    fontSize: 17,
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
    fontSize: 17,
  },
});

// DICTIONARY
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';
const title = 'Summary';
const worked = 'worked';
const perDay = 'per day';

const Summary = ({
  timeTotal, timeEffective, nDaysWorked, averagePerDay,
}) => {
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

  const daysBox = (
    <View style={styles.box}>
      <View style={styles.daysRow}>
        <Text style={styles.daysValues}>
          {prettyDays(nDaysWorked)}
        </Text>
        <Text style={styles.textLabel}>
          {worked}
        </Text>
      </View>
      <View style={styles.daysRow}>
        <Text style={styles.daysValues}>
          {prettyDuration(averagePerDay)}
        </Text>
        <Text style={styles.textLabel}>
          {perDay}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      <View style={styles.subContainer}>
        {totalBox}
        {effectiveBox}
        {daysBox}
      </View>
    </View>
  );
};

export default Summary;
