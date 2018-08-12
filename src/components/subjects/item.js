import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detail: {
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


const SubjectItem = ({
  subject, onPressDetail, onPressEdit, onPressDelete,
}) => {
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
      <TouchableOpacity
        style={styles.detail}
        onPress={() => onPressDetail(subject.id)}
      >
        {name}
        {description}
      </TouchableOpacity>
      <Button
        icon={{ name: 'edit' }}
        onPress={() => onPressEdit(subject.id)}
      />
      <Button
        icon={{ name: 'delete' }}
        onPress={() => onPressDelete(subject.id)}
      />
    </View>
  );
};

export default SubjectItem;
