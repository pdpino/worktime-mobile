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
    paddingTop: 5,
  },
  emptyList: {
    textAlign: 'center',
    marginVertical: 15,
    fontStyle: 'italic',
  },
});

const noSubjects = 'No subjects'; // DICTIONARY

const SubjectsList = ({
  subjects, onPressDetail, onPressEdit, onPressDelete,
}) => {
  const renderSubject = ({ item }) => (
    <SubjectItem
      subject={item}
      onPressDetail={onPressDetail}
      onPressEdit={onPressEdit}
      onPressDelete={onPressDelete}
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
      />
    </View>
  );
};

export default SubjectsList;
