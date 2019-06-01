import React from 'react';
import {
  StyleSheet, View, FlatList, Text, Dimensions,
} from 'react-native';
import SubjectItem from './item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  list: {
    width: Dimensions.get('window').width, // HACK?
  },
  listContainer: {
    paddingBottom: 80, // Make last item "more" button visible
  },
  emptyList: {
    textAlign: 'center',
    marginVertical: 15,
    fontStyle: 'italic',
  },
});

const noSubjects = 'No subjects'; // DICTIONARY

const SubjectsList = ({
  subjects, selectedSubjects, onPressSubject, onLongPressSubject,
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
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={emptyComponent}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default SubjectsList;
