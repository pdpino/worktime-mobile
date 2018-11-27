import React from 'react';
import {
  StyleSheet, View, Text, ActivityIndicator,
} from 'react-native';
import { daysAgo, prettyDuration } from '../../shared/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
});

// DICTIONARY
const titleText = 'Summary';
const lastWorkedText = 'Last worked on: ';
const timeTotalText = 'Total time: ';
const timeEffectiveText = 'Effective time: ';
const nDaysWorkedText = 'Days worked: ';

const SubjectInfo = ({
  lastWorkedDate, timeTotal, timeEffective, nDaysWorked, isLoading,
}) => {
  const title = (
    <Text style={styles.title}>
      {titleText}
    </Text>
  );

  const lastWorkedInfo = (
    <Text style={styles.text}>
      {lastWorkedText}
      {daysAgo(lastWorkedDate)}
    </Text>
  );

  const timeTotalInfo = (
    <Text style={styles.text}>
      {timeTotalText}
      {prettyDuration(timeTotal)}
    </Text>
  );

  const timeEffectiveInfo = (
    <Text style={styles.text}>
      {timeEffectiveText}
      {prettyDuration(timeEffective)}
    </Text>
  );

  const nDaysWorkedInfo = (
    <Text style={styles.text}>
      {nDaysWorkedText}
      {nDaysWorked}
    </Text>
  );

  return (
    <View style={styles.container}>
      {title}
      {isLoading ? <ActivityIndicator /> : (
        <View>
          {lastWorkedInfo}
          {timeTotalInfo}
          {timeEffectiveInfo}
          {nDaysWorkedInfo}
        </View>
      )}
    </View>
  );
};

export default SubjectInfo;
