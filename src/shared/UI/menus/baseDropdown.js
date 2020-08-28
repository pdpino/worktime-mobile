import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

const styles = StyleSheet.create({
  itemText: {
    color: 'black',
  },
});

class BaseDropdownMenu extends React.PureComponent {
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
    const { items, buttonComponent } = this.props;

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

    // HACK: an empty <View /> is passed as button, since is a required component.
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={this.showMenu}
        delayPressIn={0}
      >
        <View>
          {buttonComponent}
          <Menu
            button={<View />}
            ref={this.setMenuRef}
          >
            {menuItems}
          </Menu>
        </View>
      </TouchableOpacity>
    );
  }
}

export default BaseDropdownMenu;
