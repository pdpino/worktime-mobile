import React from 'react';
import { Icon } from 'react-native-elements';
import BaseDropdownMenu from './baseDropdown';

const MoreDropdownMenu = ({ items, iconSize }) => (
  <BaseDropdownMenu
    items={items}
    buttonComponent={(
      <Icon
        name="more-vertical"
        type="feather"
        size={iconSize || 26}
      />
    )}
  />
);

export default MoreDropdownMenu;
