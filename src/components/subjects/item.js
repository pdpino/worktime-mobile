import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  detail: {
    flexDirection: 'column',
    margin: 1,
  },
  name: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
  },
  button: {
    padding: 0,
    margin: 0,
  },
});


const SubjectItem = ({
  subject, onPressDetail, onPressEdit, onPressDelete, style,
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

  const editButton = (
    <Button
      buttonStyle={styles.button}
      icon={{ name: 'edit' }}
      onPress={() => onPressEdit(subject.id)}
    />
  );

  const deleteButton = (
    <Button
      buttonStyle={styles.button}
      icon={{ name: 'delete' }}
      onPress={() => onPressDelete(subject.id)}
    />
  );

  return (
    <View style={[style, styles.container]}>
      <TouchableOpacity
        style={styles.detail}
        onPress={() => onPressDetail(subject.id)}
      >
        {name}
        {description}
      </TouchableOpacity>
      {editButton}
      {deleteButton}
    </View>
  );
};

export default SubjectItem;
