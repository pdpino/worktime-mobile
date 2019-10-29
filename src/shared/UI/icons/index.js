import React from 'react';
import HamburgerIcon from './hamburger';
import ClickableIcon from './clickable';

const CrossIcon = props => <ClickableIcon {...props} icon="cross" />;

const BackIcon = props => <ClickableIcon {...props} icon="back" />;

const CheckboxIcon = ({ checked, ...props }) => (
  <ClickableIcon
    icon={checked ? 'checkboxChecked' : 'checkboxUnchecked'}
    {...props}
  />
);

export {
  CrossIcon,
  HamburgerIcon,
  ClickableIcon,
  CheckboxIcon,
  BackIcon,
};
