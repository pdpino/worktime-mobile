import React from 'react';
import {
  StyleSheet, FlatList, Text,
} from 'react-native';
import WorkSessionItem from './item';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'black',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  emptyList: {
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
    fontSize: 15,
  },
});

const WorkSessionsList = ({ subject, workSessions, onPressDelete }) => {
  const title = (
    <Text style={styles.title}>
      {subject.name}
    </Text>
  );

  const emptyComponent = (
    <Text style={styles.emptyList}>
      {i18n.t('entities.noSessions')}
    </Text>
  );

  return (
    <FlatList
      data={workSessions}
      renderItem={({ item }) => (
        <WorkSessionItem
          workSession={item}
          onPressDelete={onPressDelete}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={title}
      ListEmptyComponent={emptyComponent}
    />
  );
};

export default WorkSessionsList;
