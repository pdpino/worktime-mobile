import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aeaeae',
  },
  text: {
    fontWeight: '500',
    color: '#005885',
    fontSize: 15,
  },
});

class CategoryHeader extends React.PureComponent {
  render() {
    const { category, onPress } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(category.id)}
      >
        <Text style={styles.text}>
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default CategoryHeader;
