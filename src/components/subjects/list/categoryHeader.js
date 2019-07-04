import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aeaeae',
  },
  text: {
    fontWeight: '500',
    color: '#005885',
    textAlign: 'center',
    fontSize: 16,
  },
});

const CategoryHeader = ({
  category, onPress,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress(category.id)}
  >
    <Text style={styles.text}>
      {category.name}
    </Text>
  </TouchableOpacity>
);

export default CategoryHeader;
