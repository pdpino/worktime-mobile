import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import BaseDropdownMenu from './baseDropdown';

// REVIEW: Consider not using rn-material-menu for this component,
// since it may not be suitable for long lists (it doesn't allow
// selecting or forcing the menu direction). See:
// https://github.com/mxck/react-native-material-menu/issues/47#issuecomment-444466435
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    textAlignVertical: 'center',
  },
});

const TextDropdownMenu = ({
  items, text, containerStyle, textStyle,
}) => (
  <BaseDropdownMenu
    items={items}
    buttonComponent={(
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
        <Icon
          name="caret-down"
          type="font-awesome"
          size={22}
        />
      </View>
    )}
  />
);

export default TextDropdownMenu;
