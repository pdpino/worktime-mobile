import React from 'react';
import { StyleSheet, Picker } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});

const PickerWrapper = ({
  items, selectedId, onValueChange, enabled,
}) => {
  const itemsList = items.map(item => (
    <Picker.Item
      label={item.name}
      value={item.id}
      key={item.id}
    />
  ));

  // DICTIONARY
  itemsList.push(
    <Picker.Item
      label="None"
      value={-1}
      key={-1}
    />,
  );

  return (
    <Picker
      style={styles.picker}
      selectedValue={selectedId}
      onValueChange={onValueChange}
      enabled={enabled}
    >
      {itemsList}
    </Picker>
  );
};

export default PickerWrapper;