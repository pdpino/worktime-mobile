import React from 'react';
import {
  StyleSheet, ScrollView,
} from 'react-native';
import { TextField, ColorField } from '../../shared/UI/inputs';
import { SubmitButton } from '../../shared/UI/buttons';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const formScope = { scope: 'formFields' };

const CategoryForm = ({
  name, alias, description, color,
  onChangeName, onChangeAlias, onChangeDescription, onChangeColor,
  onSubmit, canSubmit,
}) => {
  const nameInput = (
    <TextField
      label={i18n.t('name', formScope)}
      value={name}
      placeholder={i18n.t('name', formScope)}
      onChange={onChangeName}
    />
  );

  const aliasInput = (
    <TextField
      label={i18n.t('alias', formScope)}
      value={alias}
      placeholder={i18n.t('shortName', formScope)}
      onChange={onChangeAlias}
    />
  );

  const colorInput = (
    <ColorField
      label={i18n.t('color', formScope)}
      value={color}
      onChange={onChangeColor}
    />
  );

  const descriptionInput = (
    <TextField
      label={i18n.t('description', formScope)}
      value={description}
      placeholder={i18n.t('workOnThisAndThat', formScope)}
      onChange={onChangeDescription}
      multiline
    />
  );

  const submitButton = (
    <SubmitButton
      text={i18n.t('save')}
      onPress={onSubmit}
      disabled={!canSubmit}
    />
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
