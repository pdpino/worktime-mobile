import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { daysAgo } from '../../shared/utils';

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
  lastWorked: {
    fontSize: 15,
    color: 'black',
  },
});

// DICTIONARY
const titleText = 'Summary';
const lastWorkedText = 'Last worked on: ';

const SubjectInfo = ({ lastWorkedDate }) => {
  const title = (
    <Text style={styles.title}>
      {titleText}
    </Text>
  );

  const lastWorked = (
    <Text style={styles.lastWorked}>
      {lastWorkedText}
      {daysAgo(lastWorkedDate)}
    </Text>
  );

  return (
    <View style={styles.container}>
      {title}
      {lastWorked}
    </View>
  );
};

export default SubjectInfo;
