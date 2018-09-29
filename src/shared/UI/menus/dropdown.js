import React from 'react';
import { StyleSheet } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  itemText: {
    color: 'black',
  },
});

class DropdownMenu extends React.PureComponent {
  menu = null;

  setMenuRef = (ref) => {
    this.menu = ref;
  };

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  render() {
    const { items, iconSize } = this.props;

    const menuItems = items.map((item, index) => (
      <MenuItem
        key={index.toString()}
        onPress={() => {
          this.hideMenu();
          item.callback();
        }}
        textStyle={[styles.itemText, item.textStyle]}
      >
        {item.label}
      </MenuItem>
    ));

    const moreIcon = (
      <Icon
        name="more-vertical"
        type="feather"
        size={iconSize || 26}
        onPress={this.showMenu}
      />
    );

    return (
      <Menu
        ref={this.setMenuRef}
        button={moreIcon}
      >
        {menuItems}
      </Menu>
    );
  }
}

export default DropdownMenu;
