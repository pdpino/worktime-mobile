import React from 'react';
import {
  StyleSheet, FlatList, Text, Dimensions,
} from 'react-native';
import SubjectItem from './item';
import ArchiveButton from './archive';

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get('window').width, // HACK?
  },
  emptyList: {
    textAlign: 'center',
    marginVertical: 15,
    fontStyle: 'italic',
  },
});

const noSubjects = 'No subjects'; // DICTIONARY

const SubjectsList = ({
  subjects, selectedSubjects, isArchive,
  onPressSubject, onLongPressSubject, onPressArchive,
}) => {
  const renderSubject = ({ item }) => (
    <SubjectItem
      subject={item}
      isSelected={selectedSubjects[item.id]}
      onPress={onPressSubject}
      onLongPress={onLongPressSubject}
    />
  );

  const emptyComponent = (
    <Text style={styles.emptyList}>
      {noSubjects}
    </Text>
  );

  return (
    <FlatList
      style={styles.list}
      data={subjects}
      renderItem={renderSubject}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={emptyComponent}
      ListFooterComponent={!isArchive && (
        <ArchiveButton
          onPress={onPressArchive}
        />
      )}
      enableScroll={false}
    />
  );
};

export default SubjectsList;
