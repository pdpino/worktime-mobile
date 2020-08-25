import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ClickableIcon } from '../icons';
import commonStyles from './styles';

const styles = StyleSheet.create({
  list: {
    paddingRight: 5,
    alignItems: 'center',
  },
});

const HeaderActions = ({ actions }) => (
  <FlatList
    horizontal
    contentContainerStyle={styles.list}
    data={actions}
    renderItem={({ item }) => (
      !item.disabled ? (
        <ClickableIcon
          containerStyle={commonStyles.iconContainer}
          icon={item.icon}
          color={item.color}
          onPress={item.handlePress}
        />
      ) : null
    )}
    keyExtractor={(item, index) => index.toString()}
  />
);

export default HeaderActions;
