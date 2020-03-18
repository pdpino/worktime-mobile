import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../styles';

const rnIconDefinitions = {
  archive: {
    name: 'archive',
    type: 'material-icons',
    size: 28,
  },
  archivedFolder: {
    name: 'archive',
    type: 'entypo',
    size: 24,
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
    color: colors.deletionRed,
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
  back: {
    name: 'arrow-back',
    type: 'material-icons',
    size: 26,
  },
  checkboxChecked: {
    name: 'check-square',
    type: 'feather',
    size: 22,
    color: 'black',
  },
  checkboxUnchecked: {
    name: 'square',
    type: 'feather',
    size: 22,
    color: 'black',
  },
  chevronDown: {
    name: 'chevron-down',
    type: 'feather',
    size: 30,
    color: 'black',
  },
  chevronUp: {
    name: 'chevron-up',
    type: 'feather',
    size: 30,
    color: 'black',
  },
  columns: {
    name: 'columns',
    type: 'font-awesome',
    size: 22,
    color: 'white',
  },
};

class ClickableIcon extends React.PureComponent {
  render() {
    const {
      icon, size, color, containerStyle, onPress,
    } = this.props;

    const iconDefinition = rnIconDefinitions[icon] || rnIconDefinitions.error;

    /**
     * NOTE: the TouchableOpacity could be removed (Icon can receive onPress),
     * but is used because the interaction when pressing looks better.
     */
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
  }
}

export default ClickableIcon;
