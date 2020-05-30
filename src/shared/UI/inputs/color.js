import React from 'react';
import {
  View, Text,
} from 'react-native';
import { ColorPicker } from '../pickers';
import commonStyles from './common.styles';

const ColorField = ({
  label, value, onChange,
}) => (
  <View style={commonStyles.container}>
    <Text style={commonStyles.label}>
      {label}
    </Text>
    <ColorPicker
      selectedColor={value}
      onSelect={onChange}
    />
  </View>
);

export default React.memo(ColorField);
