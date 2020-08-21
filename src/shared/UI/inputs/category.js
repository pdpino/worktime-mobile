import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { ModalPicker } from '../pickers';
import commonStyles from './common.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});

const CategoryField = ({
  label, value, onChange, categories,
}) => (
  <View style={[commonStyles.container, styles.container]}>
    <Text style={commonStyles.label}>
      {label}
    </Text>
    <ModalPicker
      flex={1}
      items={categories}
      selectedId={value}
      buttonStyle={[commonStyles.input, styles.button]}
      textStyle={styles.categoryText}
      onValueChange={onChange}
    />
  </View>
);

export default React.memo(CategoryField);
