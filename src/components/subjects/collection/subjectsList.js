import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import SubjectItem from './subjectItem';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
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
  hideDescription, littleAir,
}) => {
  const renderSubject = ({ item }) => (
    <SubjectItem
      subject={item}
      isSelected={selectedSubjects[item.id]}
      categoryColor={categoryColor}
      onPress={onPressSubject}
      onLongPress={onLongPressSubject}
      hideDescription={hideDescription}
      littleAir={littleAir}
    />
  );

  const emptyListComponent = (
    <Text style={styles.emptyList}>
      {i18n.t('empty')}
    </Text>
  );

  return (
    <FlatList
      data={subjects}
      renderItem={renderSubject}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={emptyListComponent}
    />
  );
};

export default SubjectsList;
