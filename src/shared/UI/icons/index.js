import React from 'react';
import HamburgerIcon from './hamburger';
import ClickableIcon from './clickable';

const CrossIcon = props => <ClickableIcon {...props} icon="cross" />;

export {
  CrossIcon,
  HamburgerIcon,
  ClickableIcon,
};
