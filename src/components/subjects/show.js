import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
  },
});


const SubjectShow = ({ subject }) => {
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
    <View style={styles.container}>
      {name}
      {description}
    </View>
  );
};


export default SubjectShow;
