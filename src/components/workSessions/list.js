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
  const renderSession = ({ item }) => (
    <Text>
      {item.duration}
      {' | '}
      {item.datetimeStart}
      {' | '}
      {item.datetimeEnd}
    </Text>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workSessions}
        renderItem={renderSession}
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
