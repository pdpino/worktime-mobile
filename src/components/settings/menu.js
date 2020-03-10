import React from 'react';
import {
  StyleSheet, View, Text, FlatList,
} from 'react-native';
import MenuItem from './item';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  list: {
    flex: 0,
    backgroundColor: 'white',
  },
  emptyList: {
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  versionContainer: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  versionText: {
    color: 'gray',
    fontStyle: 'italic',
  },
});

const itemsConfig = {
  profile: {
    getText: () => i18n.t('profile'),
    icon: {
      name: 'person',
      type: 'material-icons',
    },
  },
  exporting: {
    getText: () => i18n.t('porting.export'),
    icon: {
      name: 'share',
      type: 'entypo',
    },
  },
  importing: {
    getText: () => i18n.t('porting.import'),
    icon: {
      name: 'file',
      type: 'feather',
    },
  },
};

const SettingsMenu = ({
  menuItems, versionNumber, onPressItem,
}) => {
  const renderItem = ({ item }) => {
    const config = itemsConfig[item.key];
    return (
      <MenuItem
        text={config.getText()}
        iconName={config.icon.name}
        iconType={config.icon.type}
        onPress={() => onPressItem(item.key)}
      />
    );
  };

  const version = (
    <View style={styles.versionContainer}>
      <Text style={styles.versionText}>
        {i18n.t('worktimeVersion', { version: versionNumber })}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={version}
    />
  );
};

export default SettingsMenu;
