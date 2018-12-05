import React from 'react';
import {
  StyleSheet, View, Text, FlatList, Dimensions,
} from 'react-native';
import MenuItem from './item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  list: {
    flexGrow: 0,
    width: Dimensions.get('window').width, // HACK?
  },
  emptyList: {
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  versionContainer: {
    marginTop: 10,
  },
  versionText: {
    color: 'gray',
    fontStyle: 'italic',
  },
});

// DICTIONARY
const noSettingsAvailable = 'No settings available yet!';

const itemsConfig = {
  exporting: {
    text: 'Export data', // DICTIONARY
    icon: {
      name: 'share',
      type: 'entypo',
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
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={emptyComponent}
      />
      {version}
    </View>
  );
};

export default SettingsMenu;
