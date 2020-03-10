import React from 'react';
import {
  StyleSheet, ScrollView, View, Text, TextInput, Button,
} from 'react-native';
import { ModalPicker } from '../../shared/UI/pickers';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formItem: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  categoryFormItem: {
    flex: 1,
    flexDirection: 'row',
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
  inputCategory: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  inputCategoryText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    marginTop: 5,
  },
});

const formScope = { scope: 'formFields' };

const SubjectForm = ({
  name, description, categoryId, categories,
  onChangeName, onChangeDescription, onChangeCategory,
  onSubmit, canSubmit,
}) => {
  const nameInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {i18n.t('name', formScope)}
      </Text>
      <TextInput
        style={[styles.input, styles.inputName]}
        value={name}
        placeholder={i18n.t('shortAndMemorableName', formScope)}
        onChangeText={onChangeName}
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

  const categoryInput = (
    <View style={[styles.formItem, styles.categoryFormItem]}>
      <Text style={styles.label}>
        {i18n.t('entities.category')}
      </Text>
      <ModalPicker
        flex={1}
        items={categories}
        selectedId={categoryId}
        buttonStyle={[styles.input, styles.inputCategory]}
        textStyle={styles.inputCategoryText}
        onValueChange={onChangeCategory}
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
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {nameInput}
      {descriptionInput}
      {categoryInput}
      {submitButton}
    </ScrollView>
  );
};


export default SubjectForm;
