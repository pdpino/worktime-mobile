import React from 'react';
import { FlatList } from 'react-native';
import { ClickableIcon } from '../icons';
import commonStyles from './styles';

const HeaderActions = ({ actions }) => (
  <FlatList
    horizontal
    data={actions}
    renderItem={({ item }) => (
      item.enabled ? (
        <ClickableIcon
          containerStyle={commonStyles.iconContainer}
          icon={item.icon}
          onPress={item.handlePress}
        />
      ) : null
    )}
    keyExtractor={(item, index) => index.toString()}
  />
);

export default HeaderActions;
