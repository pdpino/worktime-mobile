import React from 'react';
import {
  StyleSheet, ScrollView, View,
} from 'react-native';
import { IconPicker } from '../../shared/UI/pickers';
import { TextField, CategoryField } from '../../shared/UI/inputs';
import { SubmitButton } from '../../shared/UI/buttons';
import { getLightColor } from '../../shared/styles';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameAndIconRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  nameContainer: {
    flex: 1,
  },
});

const formScope = { scope: 'formFields' };

const SubjectForm = ({
  name, description, categoryId, icon, color, categories,
  onChangeName, onChangeDescription, onChangeCategory, onChangeIcon,
  onSubmit, canSubmit,
}) => {
  const nameAndIconRow = (
    <View style={styles.nameAndIconRow}>
      <IconPicker
        name={name}
        icon={icon}
        size={30}
        color={getLightColor(color)}
        onSelect={onChangeIcon}
        defaultToIcon
      />
      <TextField
        containerStyle={styles.nameContainer}
        label={i18n.t('name', formScope)}
        value={name}
        placeholder={i18n.t('shortAndMemorableName', formScope)}
        onChange={onChangeName}
      />
    </View>
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

  const categoryInput = (
    <CategoryField
      label={i18n.t('entities.category')}
      value={categoryId}
      onChange={onChangeCategory}
      categories={categories}
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
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {nameAndIconRow}
      {descriptionInput}
      {categoryInput}
      {submitButton}
    </ScrollView>
  );
};

export default SubjectForm;
