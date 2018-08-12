import React from 'react';
import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import SubjectItem from './item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const noSubjects = 'No subjects'; // DICTIONARY

const SubjectsList = ({
  subjects, onPressDetail, onPressEdit, onPressDelete,
}) => (
  <View style={styles.container}>
    <FlatList
      data={subjects}
      renderItem={({ item }) => (
        <SubjectItem
          subject={item}
          onPressDetail={onPressDetail}
          onPressEdit={onPressEdit}
          onPressDelete={onPressDelete}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={(
        <Text>
          {noSubjects}
        </Text>
      )}
    />
  </View>
);

export default SubjectsList;
