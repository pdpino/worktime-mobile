import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { DropdownMenu } from '../../shared/UI/menus';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 15,
    marginBottom: 5,
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
    color: 'black',
  },
  description: {
    fontSize: 12,
    paddingLeft: 8,
    color: 'black',
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

  const buttons = [
    {
      label: 'Edit', // DICTIONARY
      callback: () => onPressEdit(subject.id),
    },
    {
      label: 'Delete', // DICTIONARY
      callback: () => onPressDelete(subject.id),
      textStyle: {
        color: '#d50000',
      },
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.detail}
        onPress={() => onPressDetail(subject.id)}
      >
        {name}
        {description}
      </TouchableOpacity>
      <DropdownMenu
        items={buttons}
      />
    </View>
  );
};

export default SubjectItem;
