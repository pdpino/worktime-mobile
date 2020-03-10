import React from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import asModalWithButton from './modalWithButton';
import i18n from '../../i18n';

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

const TextButton = ({
  items, selectedId, buttonStyle, textStyle, ButtonComponent,
}) => {
  const selectedItem = items.find(item => item.id === selectedId);
  const selectedName = selectedItem ? selectedItem.name : i18n.t('none');

  if (ButtonComponent) {
    return (
      <ButtonComponent
        selectedName={selectedName}
      />
    );
  }

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
          { id: -1, name: i18n.t('none') },
        ]}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default asModalWithButton(TextButton, Picker);
