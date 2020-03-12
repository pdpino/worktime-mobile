import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    padding: 10,
  },
  iconContainer: {
    padding: 3,
    marginHorizontal: 5,
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
});

const MenuItem = ({
  text, iconName, iconType, onPress,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
  >
    <Icon
      name={iconName}
      type={iconType}
      containerStyle={styles.iconContainer}
      size={26}
    />
    <Text style={styles.text}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default MenuItem;
