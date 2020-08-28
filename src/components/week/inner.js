import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { iconsConfigByName } from '../../shared/UI/icons/assignable';

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

const eventToIconSize = (size) => Math.floor(size * 0.8);
const eventToFontSize = (size) => Math.floor(size * 0.5);

const IconOrText = ({ event, position }) => {
  const { width, height } = position;
  const eventSize = Math.min(height, width);
  if (eventSize <= 8) {
    return null;
  }

  const iconConfig = event.icon && iconsConfigByName[event.icon];
  const iconSize = eventToIconSize(eventSize);

  if (iconConfig && iconSize > 5) {
    return (
      <Icon
        {...iconConfig}
        size={iconSize}
        color="white"
      />
    );
  }

  const fontSize = Math.min(eventToFontSize(eventSize), 12);

  return (
    <Text
      style={[
        styles.text,
        { fontSize },
      ]}
    >
      {event.description}
    </Text>
  );
};

export default IconOrText;
