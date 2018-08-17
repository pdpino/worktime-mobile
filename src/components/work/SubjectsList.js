import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemButton: {

  },
  itemText: {

  },
});

const noSubjects = 'No subjects'; // DICTIONARY

const SelectWork = ({ subjects, onPressSubject }) => {
  const renderSubject = ({ item }) => (
    <TouchableOpacity
      style={styles.itemButton}
      onPress={() => onPressSubject(item.id)}
    >
      <Text style={styles.itemText}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={(
          <Text>
            {noSubjects}
          </Text>
        )}
      />
    </View>
  );
};

export default SelectWork;
