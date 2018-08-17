import React from 'react';
import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import { prettyDate } from '../../shared/utils';

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
  },
  list: {
    // width: Dimensions.get('window').width, // HACK?
  },
  item: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    // backgroundColor: 'white',
  },
  subitem: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingVertical: 4,
    paddingHorizontal: 2,
    marginRight: 50,
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

  // REVIEW: move to workSession/item
  const renderWorkSession = ({ item }) => {
    const seconds = Math.floor(item.getTotalSeconds());

    return (
      <View style={styles.item}>
        <View style={styles.subitem}>
          <Text>
            {prettyDate(item.date)}
          </Text>
          <Text>
            {item.getHourStart()}
            {' - '}
            {item.getHourEnd()}
          </Text>
        </View>
        <View style={styles.subitem}>
          <Text>
            {seconds}
            {' s'}
          </Text>
          <Text>
            {item.status}
          </Text>
          <Text>
            Hola
          </Text>
        </View>
      </View>
    );
  };

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
