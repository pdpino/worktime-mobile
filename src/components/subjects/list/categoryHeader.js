import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 15,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
  },
  text: {
    fontWeight: '500',
    color: colors.darkBlue,
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
