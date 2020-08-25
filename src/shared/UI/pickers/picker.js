import React from 'react';
import { StyleSheet, Picker } from 'react-native';
import i18n from '../../i18n';

// DEPRECATED: this Component is deprecated, prefer ModalPicker

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});

const PickerWrapper = ({
  items, selectedId, onValueChange, enabled,
}) => {
  const itemsList = items.map((item) => (
    <Picker.Item
      label={item.name}
      value={item.id}
      key={item.id}
    />
  ));

  itemsList.push(
    <Picker.Item
      label={i18n.t('none')}
      value={-1}
      key={-1}
    />,
  );

  // NOTE: there is a bug on RN 0.59 that sets the picker mode to "dropdown".
  // See https://github.com/facebook/react-native/issues/24055
  return (
    <Picker
      style={styles.picker}
      selectedValue={selectedId}
      onValueChange={onValueChange}
      enabled={enabled}
      mode="dialog"
    >
      {itemsList}
    </Picker>
  );
};

export default PickerWrapper;
