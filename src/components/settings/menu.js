import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  list: {
    flexGrow: 0,
    width: Dimensions.get('window').width, // HACK?
    borderBottomWidth: 1,
  },
  emptyList: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
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

const SettingsMenu = ({
  menuItems, versionNumber, onPressItem,
}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onPressItem(item.key)}
    >
      <Text>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

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
