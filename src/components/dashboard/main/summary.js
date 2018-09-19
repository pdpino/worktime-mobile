import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  prettyDuration, prettyDaysSpan, prettyDays,
} from '../../../shared/utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  title: {
    color: 'black',
  },
  body: {
    padding: 10,
  },
  text: {
    color: 'black',
  },
});

// DICTIONARY
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';
const title = 'Summary';
const worked = 'worked';
const perDay = 'per day';

const Summary = ({
  timeTotal, timeEffective, effectivePercentage,
  initialDate, endingDate, nDaysWorked, averagePerDay,
}) => {
  const period = prettyDaysSpan(initialDate, endingDate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      <View style={styles.body}>
        <Text style={styles.text}>
          {`${timeTotalLabel} ${prettyDuration(timeTotal)}`}
        </Text>
        <Text style={styles.text}>
          {`${timeEffectiveLabel} ${prettyDuration(timeEffective)}`}
        </Text>
        <Text style={styles.text}>
          {`${effectivePercentage} %`}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>
          {period}
        </Text>
        <Text style={styles.text}>
          {`${prettyDays(nDaysWorked)} ${worked}`}
        </Text>
        <Text style={styles.text}>
          {`${prettyDuration(averagePerDay)} ${perDay}`}
        </Text>
      </View>
    </View>
  );
};

export default Summary;
