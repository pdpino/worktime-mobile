import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  prettyDuration, prettyDaysSpan, prettyDays, prettyPercentage,
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
    borderWidth: 1,
    borderRadius: 3,
    padding: 3,
  },
  boxTitle: {

  },
  text: {
    textAlign: 'center',
    color: 'black',
  },
});

// DICTIONARY
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';
const title = 'Summary';
const worked = 'worked';
const perDay = 'per day';
const periodLabel = 'period';

const Summary = ({
  timeTotal, timeEffective,
  initialDate, endingDate, nDaysWorked, averagePerDay,
}) => {
  const period = prettyDaysSpan(initialDate, endingDate);

  const totalBox = (
    <View style={styles.box}>
      <Text style={styles.text}>
        {prettyDuration(timeTotal)}
      </Text>
      <Text style={styles.text}>
        {timeTotalLabel}
      </Text>
    </View>
  );

  const effectiveBox = (
    <View style={styles.box}>
      <Text style={styles.text}>
        {prettyDuration(timeEffective)}
      </Text>
      <Text style={styles.text}>
        {prettyPercentage(timeEffective, timeTotal)}
      </Text>
      <Text style={styles.text}>
        {timeEffectiveLabel}
      </Text>
    </View>
  );

  const daysBox = (
    <View style={styles.box}>
      <Text style={styles.text}>
        {`${period} ${periodLabel}`}
      </Text>
      <Text style={styles.text}>
        {`${prettyDays(nDaysWorked)} ${worked}`}
      </Text>
      <Text style={styles.text}>
        {`${prettyDuration(averagePerDay)} ${perDay}`}
      </Text>
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
