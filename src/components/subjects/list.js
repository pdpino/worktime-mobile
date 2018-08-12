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

const noSubject = 'No subjects'; // DICTIONARY

const SubjectsList = ({ subjects, onPressSubject }) => (
  <View style={styles.container}>
    <FlatList
      data={subjects}
      renderItem={({ item }) => (
        <SubjectItem
          subject={item}
          onPressSubject={onPressSubject}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={(
        <Text>
          {noSubject}
        </Text>
      )}
    />
  </View>
);

export default SubjectsList;
