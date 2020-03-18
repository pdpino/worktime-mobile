import React from 'react';
import {
  StyleSheet, ScrollView, View, Text, TextInput, Button,
} from 'react-native';
import { ColorPicker } from '../../shared/UI/pickers';
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
  colorPicker: {
    marginVertical: 5,
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
  name, alias, description, color,
  onChangeName, onChangeAlias, onChangeDescription, onChangeColor,
  onSubmit, canSubmit,
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

  const colorInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {i18n.t('color', formScope)}
      </Text>
      <ColorPicker
        style={styles.colorPicker}
        selectedColor={color}
        onSelect={onChangeColor}
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

  const submitButton = (
    <View style={[styles.formItem, styles.button]}>
      <Button
        title={i18n.t('save')}
        onPress={onSubmit}
        disabled={!canSubmit}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {nameInput}
      {aliasInput}
      {colorInput}
      {descriptionInput}
      {submitButton}
    </ScrollView>
  );
};


export default CategoryForm;
