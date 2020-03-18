import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import SubjectItem from './subjectItem';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  emptyList: {
    marginTop: 5,
    marginLeft: 25,
    color: 'black',
    fontSize: 15,
    fontStyle: 'italic',
  },
});

const SubjectsList = ({
  subjects, categoryColor, selectedSubjects, onPressSubject, onLongPressSubject,
}) => {
  const renderSubject = ({ item }) => (
    <SubjectItem
      subject={item}
      isSelected={selectedSubjects[item.id]}
      categoryColor={categoryColor}
      onPress={onPressSubject}
      onLongPress={onLongPressSubject}
    />
  );

  const emptyListComponent = (
    <Text style={styles.emptyList}>
      {i18n.t('empty')}
    </Text>
  );

  return (
    <FlatList
      style={styles.container}
      data={subjects}
      renderItem={renderSubject}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={emptyListComponent}
    />
  );
};

export default SubjectsList;
