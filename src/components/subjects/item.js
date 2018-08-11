import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 1,
    // DEBUG:
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  name: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
  },
});


const SubjectItem = ({ subject, onPressSubject }) => {
  const name = (
    <Text style={styles.name}>
      {subject.name}
    </Text>
  );

  const description = (
    <Text style={styles.description}>
      {subject.description}
    </Text>
  );

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPressSubject(subject.id)}
    >
      {name}
      {description}
    </TouchableOpacity>
  );
};

export default SubjectItem;
