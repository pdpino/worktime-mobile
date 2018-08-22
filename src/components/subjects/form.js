import React from 'react';
import {
  StyleSheet, View, TextInput, Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
  },
});

// DICTIONARY
const namePlaceholder = 'Name';
const descriptionPlaceholder = 'Description';

const SubjectForm = ({
  name, description, onChangeName, onChangeDescription, onSubmit, canSubmit,
}) => {
  const nameInput = (
    <TextInput
      style={styles.name}
      value={name}
      placeholder={namePlaceholder}
      onChangeText={onChangeName}
    />
  );

  const descriptionInput = (
    <TextInput
      style={styles.description}
      value={description}
      placeholder={descriptionPlaceholder}
      onChangeText={onChangeDescription}
    />
  );

  const submitText = 'Save'; // DICTIONARY
  const submitButton = (
    <Button
      title={submitText}
      onPress={onSubmit}
      disabled={!canSubmit}
    />
  );

  return (
    <View style={styles.container}>
      {nameInput}
      {descriptionInput}
      {submitButton}
    </View>
  );
};


export default SubjectForm;
