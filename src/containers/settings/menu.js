import React from 'react';
import DeviceInfo from 'react-native-device-info';
import SettingsMenuComponent from '../../components/settings/menu';

const menuItems = [
  /* ADD MENU ENTRIES HERE */
  /* Example object:
  {
    key: 'setting1', // key to navigate
    title: 'Setting 1', // Name to display in menu
  }
  */
];

class SettingsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handlePressItem = this.handlePressItem.bind(this);
  }

  handlePressItem(key) {
    this.props.navigation.navigate(key);
  }

  render() {
    return (
      <SettingsMenuComponent
        menuItems={menuItems}
        versionNumber={DeviceInfo.getVersion()}
        onPressItem={this.handlePressItem}
      />
    );
  }
}

export default SettingsMenu;
