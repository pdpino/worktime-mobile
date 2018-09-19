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
  list: {
    // width: Dimensions.get('window').width, // HACK?
  },
});

// DICTIONARY
const noWorkSessions = 'No sessions';
const titleText = 'Work Sessions';

const WorkSessionsList = ({ workSessions, listProps }) => {
  const title = (
    <Text style={styles.title}>
      {titleText}
    </Text>
  );

  const renderWorkSession = ({ item }) => (
    <WorkSessionItem workSession={item} />
  );

  const emptyComponent = (
    <Text>
      {noWorkSessions}
    </Text>
  );

  return (
    <View style={styles.container}>
      {title}
      <FlatList
        style={styles.list}
        data={workSessions}
        renderItem={renderWorkSession}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={emptyComponent}
        {...listProps}
      />
    </View>
  );
};

export default WorkSessionsList;
