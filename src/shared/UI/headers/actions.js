import React from 'react';
import { FlatList } from 'react-native';
import { ClickableIcon } from '../icons';
import commonStyles from './styles';

const HeaderActions = ({ actions }) => (
  <FlatList
    horizontal
    contentContainerStyle={{ paddingRight: 5 }}
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
