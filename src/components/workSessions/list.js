import React from 'react';
import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import WorkSessionItem from './item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'black',
  },
  emptyList: {
    textAlign: 'center',
    marginVertical: 15,
    fontStyle: 'italic',
  },
});

// DICTIONARY
const noWorkSessions = 'No sessions';
const titleText = 'Work Sessions';

const WorkSessionsList = ({ workSessions, onPressDelete }) => {
  const title = (
    <Text style={styles.title}>
      {titleText}
    </Text>
  );

  const emptyComponent = (
    <Text style={styles.emptyList}>
      {noWorkSessions}
    </Text>
  );

  return (
    <View style={styles.container}>
      {title}
      <FlatList
        data={workSessions}
        renderItem={({ item }) => (
          <WorkSessionItem
            workSession={item}
            onPressDelete={onPressDelete}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={emptyComponent}
        enableScroll={false}
      />
    </View>
  );
};

export default WorkSessionsList;
