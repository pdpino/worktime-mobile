import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { iconsConfigByName } from './list';
import { colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 5,
  },
  initialLetter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

const iconToCircleSize = 1.3; // set by hand

const getCircleSize = (size) => {
  const circleSize = size * iconToCircleSize;
  return {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
  };
};

const getFontSize = (size) => Math.floor(size * (3 / 5));

const AssignableIcon = ({
  containerStyle, name, icon, color, size,
}) => {
  if (icon) {
    return (
      <Icon
        containerStyle={[styles.container, containerStyle]}
        size={size}
        color={color}
        {...iconsConfigByName[icon]}
      />
    );
  }
  const initialLetter = name ? name[0].toUpperCase() : 'N';
  return (
    <View
      style={[
        styles.container,
        getCircleSize(size),
        { backgroundColor: color || colors.lightGray },
      ]}
    >
      <Text
        style={[
          styles.initialLetter,
          {
            fontSize: getFontSize(size),
          },
        ]}
      >
        {initialLetter}
      </Text>
    </View>
  );
};

export default AssignableIcon;
