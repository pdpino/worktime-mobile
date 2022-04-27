import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { iconsConfigByName, DEFAULT_ICON_CONFIG } from './list';
import { colors } from '../../../styles';
import { isNumber } from '../../../utils';

const CONTAINER_MARGIN = 8;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: CONTAINER_MARGIN,
  },
  initialLetter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

const DEFAULT_COLOR = colors.lightGray;
const DEFAULT_SIZE = 30;
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
    marginHorizontal: margin + CONTAINER_MARGIN,
    borderRadius: circleSize / 2,
  };
};

const getFontSize = (size) => Math.floor(size * FONT_FACTOR);

const AssignableIcon = ({
  name, icon, color, size = DEFAULT_SIZE, containerStyle, defaultToIcon = false,
}) => {
  if (!isNumber(size)) {
    // eslint-disable-next-line no-console
    console.error('AssignableIcon: size provided is not a number');
    return null;
  }
  const iconConfig = (icon && iconsConfigByName[icon])
    || (defaultToIcon ? DEFAULT_ICON_CONFIG : null);

  if (iconConfig) {
    return (
      <Icon
        containerStyle={[
          styles.container,
          { width: size * WIDTH_FACTOR },
          containerStyle,
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
        containerStyle,
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
