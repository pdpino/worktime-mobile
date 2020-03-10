import React from 'react';
import {
  StyleSheet, View, Text, TextInput, Button,
} from 'react-native';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputDescription: {
    height: 100,
  },
  button: {
    marginTop: 5,
  },
});

const formScope = { scope: 'formFields' };

const CategoryForm = ({
  name, alias, description,
  onChangeName, onChangeAlias, onChangeDescription, onSubmit, canSubmit,
}) => {
  const nameInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {i18n.t('name', formScope)}
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder={i18n.t('name', formScope)}
        onChangeText={onChangeName}
      />
    </View>
  );

  const aliasInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {i18n.t('alias', formScope)}
      </Text>
      <TextInput
        style={styles.input}
        value={alias}
        placeholder={i18n.t('shortName', formScope)}
        onChangeText={onChangeAlias}
      />
    </View>
  );

  const descriptionInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {i18n.t('description', formScope)}
      </Text>
      <TextInput
        style={[styles.input, styles.inputDescription]}
        value={description}
        placeholder={i18n.t('workOnThisAndThat', formScope)}
        onChangeText={onChangeDescription}
        multiline
      />
    </View>
  );

  const submitText = i18n.t('save');
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
      {aliasInput}
      {descriptionInput}
      {submitButton}
    </View>
  );
};


export default CategoryForm;
