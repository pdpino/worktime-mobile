import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { iconsConfigByName } from './list';
import { colors } from '../../../styles';

const CONTAINER_MARGIN = 8;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: CONTAINER_MARGIN,
  },
  initialLetter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

const DEFAULT_COLOR = colors.lightGray;
// NOTE: values manually set
const FONT_FACTOR = 0.6;
const WIDTH_FACTOR = 1.4;
const CIRCLE_FACTOR = 1.2;
const CIRCLE_MARGIN = (WIDTH_FACTOR - CIRCLE_FACTOR) / 2;

const getCircleStyle = (size) => {
  const circleSize = size * CIRCLE_FACTOR;
  const margin = size * CIRCLE_MARGIN;
  return {
    width: circleSize,
    height: circleSize,
    margin: margin + CONTAINER_MARGIN,
    borderRadius: circleSize / 2,
  };
};

const getFontSize = (size) => Math.floor(size * FONT_FACTOR);

const AssignableIcon = ({
  name, icon, color, size,
}) => {
  const iconConfig = icon && iconsConfigByName[icon];
  if (iconConfig) {
    return (
      <Icon
        containerStyle={[
          styles.container,
          { width: size * WIDTH_FACTOR },
        ]}
        size={size}
        color={color || DEFAULT_COLOR}
        {...iconConfig}
      />
    );
  }
  const initialLetter = name ? name[0].toUpperCase() : 'N';
  return (
    <View
      style={[
        styles.container,
        getCircleStyle(size),
        { backgroundColor: color || DEFAULT_COLOR },
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
