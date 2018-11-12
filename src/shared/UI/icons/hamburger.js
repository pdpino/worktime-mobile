import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

/*
  * NOTE: this icon is deprecated since v1.1.0,
  * drawer navigator was changed to a tab navigator
*/

const styles = StyleSheet.create({
  icon: {
    margin: 13,
    padding: 3,
  },
});

const HamburgerIcon = ({ onPress }) => (
  <Icon
    name="menu"
    type="feather"
    color="white"
    size={24}
    iconStyle={styles.icon}
    onPress={onPress}
  />
);

export default HamburgerIcon;
