import React from 'react';
import { Icon } from 'react-native-elements';

const CheckboxIcon = ({ checked, containerStyle, onPress }) => (
  <Icon
    containerStyle={containerStyle}
    name={checked ? 'check-square' : 'square'}
    type="feather"
    size={22}
    onPress={onPress}
  />
);

export default CheckboxIcon;
