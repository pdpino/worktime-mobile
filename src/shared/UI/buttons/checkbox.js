import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    marginHorizontal: 3,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
  },
  checkedText: {
    fontWeight: 'bold',
  },
});

const ItemCheckbox = ({
  text, checked, containerStyle, textStyle, onPress,
}) => (
  <TouchableOpacity
    style={[styles.container, containerStyle]}
    onPress={onPress}
  >
    <Icon
      name={checked ? 'check-square' : 'square'}
      type="feather"
      size={20}
      containerStyle={styles.checkboxIcon}
    />
    <Text style={[
      styles.text,
      checked && styles.checkedText,
      textStyle,
    ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

export default ItemCheckbox;
