import React from 'react';
import {
  StyleSheet, ScrollView,
} from 'react-native';
import { SubmitButton } from '../../../shared/UI/buttons';
import { CategoryField } from '../../../shared/UI/inputs';
import i18n from '../../../shared/i18n';
import SubjectsInfo from './info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BulkSubjectsForm = ({
  subjects, categoryId, categories, onChangeCategory, onSubmit,
}) => (
  <ScrollView style={styles.container}>
    <SubjectsInfo
      subjects={subjects}
    />
    <CategoryField
      label={i18n.t('entities.category')}
      value={categoryId}
      onChange={onChangeCategory}
      categories={categories}
    />
    <SubmitButton
      text={i18n.t('save')}
      onPress={onSubmit}
    />
  </ScrollView>
);

export default BulkSubjectsForm;
