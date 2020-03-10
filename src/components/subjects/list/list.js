import React from 'react';
import {
  StyleSheet, Text, SectionList, View,
} from 'react-native';
import SubjectItem from './item';
import CategoryHeader from './categoryHeader';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  categoryBottom: {
    marginBottom: 25,
  },
  emptyList: {
    marginVertical: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptyCategory: {
    marginTop: 5,
    marginLeft: 25,
    color: 'black',
    fontSize: 15,
    fontStyle: 'italic',
  },
});

const SubjectsList = ({
  subjectsByCategories, selectedSubjects,
  onPressSubject, onLongPressSubject, onPressCategory,
}) => {
  const renderSubject = ({ item }) => (
    <SubjectItem
      subject={item}
      isSelected={selectedSubjects[item.id]}
      onPress={onPressSubject}
      onLongPress={onLongPressSubject}
    />
  );

  const renderCategory = ({ section }) => (
    <CategoryHeader
      category={section}
      onPress={onPressCategory}
    />
  );

  const renderCategoryFooter = ({ section }) => section.data.length === 0 && (
    <Text style={[styles.emptyCategory, styles.categoryBottom]}>
      {i18n.t('empty')}
    </Text>
  );

  const renderCategorySeparator = ({ leadingItem }) => (leadingItem ? (
    <View style={styles.categoryBottom} />
  ) : null);

  const emptyListComponent = (
    <Text style={styles.emptyList}>
      {i18n.t('entities.noSubjects')}
    </Text>
  );

  return (
    <SectionList
      sections={subjectsByCategories}
      renderItem={renderSubject}
      renderSectionHeader={renderCategory}
      renderSectionFooter={renderCategoryFooter}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={emptyListComponent}
      SectionSeparatorComponent={renderCategorySeparator}
    />
  );
};

export default SubjectsList;
