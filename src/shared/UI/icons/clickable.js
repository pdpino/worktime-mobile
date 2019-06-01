import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const rnIconDefinitions = {
  archive: {
    name: 'archive',
    type: 'material-icons',
    size: 28,
  },
  edit: {
    name: 'edit',
    type: 'material-icons',
    size: 28,
  },
  cross: {
    name: 'x',
    type: 'feather',
    size: 26,
  },
  delete: {
    name: 'delete',
    type: 'material-icons',
    size: 28,
  },
  error: {
    name: 'error',
    type: 'material-icons',
    color: 'black',
  },
  unarchive: {
    name: 'unarchive',
    type: 'material-icons',
    size: 28,
  },
};

const ClickableIcon = ({
  icon, size, color, containerStyle, onPress,
}) => {
  const iconDefinition = rnIconDefinitions[icon] || rnIconDefinitions.error;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
    >
      <Icon
        name={iconDefinition.name}
        type={iconDefinition.type}
        size={size || iconDefinition.size || 26}
        color={color || iconDefinition.color || 'white'}
      />
    </TouchableOpacity>
  );
};

export default ClickableIcon;
