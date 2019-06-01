import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { CrossIcon, ClickableIcon } from '../icons';

const styles = StyleSheet.create({
  iconContainer: {
    margin: 10,
  },
});

const getSelectionHeaderParams = ({
  amountSelected, actions, handleUnselection,
}) => ({
  title: amountSelected.toString(),
  headerLeft: (
    <CrossIcon
      containerStyle={styles.iconContainer}
      onPress={handleUnselection}
    />
  ),
  headerRight: (
    <FlatList
      horizontal
      data={actions}
      renderItem={({ item }) => (
        item.enabled ? (
          <ClickableIcon
            containerStyle={styles.iconContainer}
            icon={item.icon}
            onPress={item.handlePress}
          />
        ) : null
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  ),
  headerStyle: {
    backgroundColor: '#005885',
  },
});

export default getSelectionHeaderParams;
