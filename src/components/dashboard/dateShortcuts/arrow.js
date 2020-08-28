import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../../shared/styles';

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors.mainBlue,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

const Arrow = ({ direction, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    underlayColor={colors.lightBlue}
    activeOpacity={0.4}
    delayPressIn={0}
  >
    <Icon
      iconStyle={styles.iconContainer}
      name={`caret-${direction}`}
      type="font-awesome"
      color="white"
      size={22}
    />
  </TouchableOpacity>
);

export default React.memo(Arrow);
