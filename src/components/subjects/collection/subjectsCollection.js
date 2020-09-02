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

const EmptyListComponent = () => (
  <Text style={styles.emptyList}>
    {i18n.t('entities.noSubjects')}
  </Text>
);

const SubjectsCollection = ({
  categoriesWithSubjects, selectedSubjects,
  onPressSubject, onLongPressSubject, onPressCategory,
  listStyle, hideDescription, littleAir, hideEmptyCategories,
}) => {
  const renderCategoryItem = ({ item }) => (
    (!hideEmptyCategories || item.subjects.length > 0) ? (
      <CategoryItem
        category={item}
        selectedSubjects={selectedSubjects}
        onPressSubject={onPressSubject}
        onLongPressSubject={onLongPressSubject}
        onPressCategory={onPressCategory}
        hideDescription={hideDescription}
        littleAir={littleAir}
      />
    ) : null
  );

  return (
    <FlatList
      style={listStyle}
      data={categoriesWithSubjects}
      renderItem={renderCategoryItem}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={EmptyListComponent}
    />
  );
};

export default SubjectsCollection;
