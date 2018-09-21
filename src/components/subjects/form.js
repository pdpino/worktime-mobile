import React from 'react';
import {
  StyleSheet, View, Text, TextInput, Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  formItem: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    padding: 10,
  },
  inputName: { },
  inputDescription: {
    height: 100,
  },
  button: {
    marginTop: 5,
  },
});

// DICTIONARY
const namePlaceholder = 'Short and memorable name';
const descriptionPlaceholder = 'Work on this and that...';
const nameLabel = 'Name';
const descriptionLabel = 'Description';

const SubjectForm = ({
  name, description, onChangeName, onChangeDescription, onSubmit, canSubmit,
}) => {
  const nameInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {nameLabel}
      </Text>
      <TextInput
        style={[styles.input, styles.inputName]}
        value={name}
        placeholder={namePlaceholder}
        onChangeText={onChangeName}
      />
    </View>
  );

  const descriptionInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {descriptionLabel}
      </Text>
      <TextInput
        style={[styles.input, styles.inputDescription]}
        value={description}
        placeholder={descriptionPlaceholder}
        onChangeText={onChangeDescription}
        multiline
      />
    </View>
  );

  const submitText = 'Save'; // DICTIONARY
  const submitButton = (
    <View style={[styles.formItem, styles.button]}>
      <Button
        title={submitText}
        onPress={onSubmit}
        disabled={!canSubmit}
      />
    </View>
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
