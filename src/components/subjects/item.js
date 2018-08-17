import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 15,
    marginBottom: 5,
    // justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  detail: {
    flexDirection: 'column',
    margin: 1,
    flex: 2,
  },
  name: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
    paddingLeft: 8,
  },
  buttons: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    padding: 0,
    margin: 0,
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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.detail}
        onPress={() => onPressDetail(subject.id)}
      >
        {name}
        {description}
      </TouchableOpacity>
      <View style={styles.buttons}>
        {editButton}
        {deleteButton}
      </View>
    </View>
  );
};

export default SubjectItem;
