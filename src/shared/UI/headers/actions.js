import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ClickableIcon } from '../icons';
import commonStyles from './styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 5,
    alignItems: 'center',
  },
});

const HeaderActions = ({ actions }) => (
  <View style={styles.container}>
    {actions.map((action, index) => action.disabled ? null : (
      <ClickableIcon
        key={index.toString()}
        containerStyle={commonStyles.iconContainer}
        icon={action.icon}
        color={action.color}
        onPress={action.handlePress}
      />
    ))}
  </View>
);

export default HeaderActions;
