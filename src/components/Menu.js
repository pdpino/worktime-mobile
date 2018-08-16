import React from 'react';
import {
  StyleSheet, View, FlatList, TouchableOpacity, Text, Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    padding: 10,
  },
  list: {
    width: Dimensions.get('window').width, // HACK?
    paddingHorizontal: 20,
  },
  itemButton: {
    marginVertical: 10,
    backgroundColor: '#20b2aa',
  },
  itemText: {
    fontSize: 20,
    paddingVertical: 5,
    textAlign: 'center',
    color: 'white',
  },
});

const Menu = ({ options, onPressOption }) => {
  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.itemButton}
      onPress={() => onPressOption(item.key)}
    >
      <Text style={styles.itemText}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={options}
        renderItem={renderOption}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Menu;
