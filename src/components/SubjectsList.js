import React from 'react';
import {
  StyleSheet, View, FlatList, TouchableOpacity, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemButton: {
    flex: 1,
    margin: 1,
    // DEBUG:
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  itemText: {
    fontSize: 20,
  },
});

const SubjectsList = ({ subjects, onPressSubject }) => {
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
      />
    </View>
  );
};

export default SubjectsList;
