import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import CategoryItem from './categoryItem';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  emptyList: {
    marginVertical: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const SubjectsCollection = ({
  categoriesWithSubjects, selectedSubjects,
  onPressSubject, onLongPressSubject, onPressCategory,
}) => {
  const renderCategoryItem = ({ item }) => (
    <CategoryItem
      category={item}
      selectedSubjects={selectedSubjects}
      onPressSubject={onPressSubject}
      onLongPressSubject={onLongPressSubject}
      onPressCategory={onPressCategory}
    />
  );

  const emptyListComponent = (
    <Text style={styles.emptyList}>
      {i18n.t('entities.noSubjects')}
    </Text>
  );

  return (
    <FlatList
      data={categoriesWithSubjects}
      renderItem={renderCategoryItem}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={emptyListComponent}
    />
  );
};

export default SubjectsCollection;
