import React from 'react';
import {
  StyleSheet, View, Text, FlatList,
} from 'react-native';
import MenuItem from './item';

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

// DICTIONARY
const noSettingsAvailable = 'No settings available yet!';

const itemsConfig = {
  profile: {
    text: 'Profile', // DICTIONARY
    icon: {
      name: 'person',
      type: 'material-icons',
    },
  },
  exporting: {
    text: 'Export', // DICTIONARY
    icon: {
      name: 'share',
      type: 'entypo',
    },
  },
  importing: {
    text: 'Import', // DICTIONARY
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
        text={config.text}
        iconName={config.icon.name}
        iconType={config.icon.type}
        onPress={() => onPressItem(item.key)}
      />
    );
  };

  const emptyComponent = (
    <Text style={styles.emptyList}>
      {noSettingsAvailable}
    </Text>
  );

  // DICTIONARY
  const version = (
    <View style={styles.versionContainer}>
      <Text style={styles.versionText}>
        {`Worktime version: ${versionNumber}`}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={emptyComponent}
      ListFooterComponent={version}
    />
  );
};

export default SettingsMenu;
