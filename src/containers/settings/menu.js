import React from 'react';
import DeviceInfo from 'react-native-device-info';
import SettingsMenuComponent from '../../components/settings/menu';

const menuItems = [
  {
    key: 'profile',
  },
  {
    key: 'exporting',
  },
  {
    key: 'importing',
  },
];

export class SettingsMenu extends React.Component {
  handlePressItem = (key) => {
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
