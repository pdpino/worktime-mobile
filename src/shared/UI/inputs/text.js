import React from 'react';
import {
  View, Text, TextInput,
} from 'react-native';
import commonStyles from './common.styles';
import { colors } from '../../styles';

const TextField = ({
  containerStyle, label, value, placeholder, onChange, multiline,
}) => (
  <View style={[commonStyles.container, containerStyle]}>
    <Text style={commonStyles.label}>
      {label}
    </Text>
    <TextInput
      style={[commonStyles.input, multiline && {
        height: 100,
      }]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.lightGray}
      onChangeText={onChange}
      multiline={multiline}
    />
  </View>
);

export default React.memo(TextField);
