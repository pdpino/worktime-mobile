import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ClickableIcon } from '../icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 20,
  },
});

const HeaderActions = ({ actions }) => {
  if (actions.length === 0) {
    return null;
  }
  if (actions.length === 1) {
    const action = actions[0];
    return action.disabled ? null : (
      <ClickableIcon
        containerStyle={styles.iconContainer}
        icon={action.icon}
        color={action.color}
        onPress={action.handlePress}
      />
    );
  }
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (action.disabled ? null : (
        <ClickableIcon
          key={index.toString()}
          containerStyle={styles.iconContainer}
          icon={action.icon}
          color={action.color}
          onPress={action.handlePress}
        />
      )))}
    </View>
  );
};

export default HeaderActions;
