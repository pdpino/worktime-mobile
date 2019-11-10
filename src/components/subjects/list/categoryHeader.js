import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 15,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#005885',
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
