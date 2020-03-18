import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colorPalette } from '../../styles';

const circleSize = 30;

const styles = StyleSheet.create({
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderColor: 'black',
    marginHorizontal: 3,
    justifyContent: 'center',
  },
});

class ColorPicker extends React.PureComponent {
  render() {
    const { selectedColor, onSelect, style } = this.props;

    const renderItem = ({ item }) => {
      const isSelected = item.key === selectedColor;

      return (
        <TouchableOpacity
          onPress={() => onSelect(item.key)}
        >
          <View
            style={[
              styles.circle,
              {
                backgroundColor: item.strong,
                borderWidth: isSelected ? 1 : 0,
              },
            ]}
          >
            {isSelected && (
              <Icon
                name="check"
                type="material-icons"
                color="black"
                size={20}
              />
            )}
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        style={style}
        data={colorPalette}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        extraData={selectedColor}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

export default ColorPicker;
