import React from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import asModalWithButton from './modalWithButton';

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemContainer: {
    marginVertical: 10,
    marginLeft: 10,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});

// DICTIONARY
const noneText = 'None';

const TextButton = ({
  items, selectedId, buttonStyle, textStyle,
}) => {
  const selectedItem = items.find(item => item.id === selectedId);
  const selectedName = selectedItem ? selectedItem.name : noneText;

  return (
    <View style={buttonStyle}>
      <Text style={textStyle}>
        {selectedName}
      </Text>
    </View>
  );
};

const Picker = ({
  items, onValueChange, closeModal,
}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        closeModal();
        if (onValueChange) {
          onValueChange(item.id);
        }
      }}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={[
          ...items,
          { id: -1, name: noneText },
        ]}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default asModalWithButton(TextButton, Picker);