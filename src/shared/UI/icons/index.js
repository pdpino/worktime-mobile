import React from 'react';
import HamburgerIcon from './hamburger';
import ClickableIcon from './clickable';
import CheckboxIcon from './checkbox';

const CrossIcon = props => <ClickableIcon {...props} icon="cross" />;

export {
  CrossIcon,
  HamburgerIcon,
  ClickableIcon,
  CheckboxIcon,
};
