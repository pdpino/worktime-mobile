import React from 'react';
import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const noWorkSessions = 'No sessions'; // DICTIONARY

const WorkSessionsList = ({ workSessions }) => {
  const renderWorkSession = ({ item }) => {
    const seconds = Math.floor(item.getTotalSeconds());

    return (
      <Text>
        {item.date}
        {' | '}
        {item.getHourStart()}
        {' - '}
        {item.getHourEnd()}
        {' | '}
        {seconds}
        {' s | '}
        {item.status}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={workSessions}
        renderItem={renderWorkSession}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={(
          <Text>
            {noWorkSessions}
          </Text>
        )}
      />
    </View>
  );
};

export default WorkSessionsList;
