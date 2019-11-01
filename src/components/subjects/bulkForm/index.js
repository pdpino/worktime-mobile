import React from 'react';
import {
  StyleSheet, ScrollView, View, Text, Button,
} from 'react-native';
import { ModalPicker } from '../../../shared/UI/pickers';
import SubjectsInfo from './info';

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

// DICTIONARY
const dictCategory = 'Category';

const BulkSubjectsForm = ({
  subjects, categoryId, categories, onChangeCategory, onSubmit,
}) => {
  const categoryInput = (
    <View style={[styles.formItem, styles.categoryFormItem]}>
      <Text style={styles.label}>
        {dictCategory}
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

  const submitText = 'Save'; // DICTIONARY
  const submitButton = (
    <View style={[styles.formItem, styles.button]}>
      <Button
        title={submitText}
        onPress={onSubmit}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <SubjectsInfo
        subjects={subjects}
      />
      {categoryInput}
      {submitButton}
    </ScrollView>
  );
};


export default BulkSubjectsForm;
