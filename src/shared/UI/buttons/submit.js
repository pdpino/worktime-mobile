import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 32,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 2,
  },
  enabled: {
    backgroundColor: colors.enabledSubmitButton,
    elevation: 4,
  },
  disabled: {
    backgroundColor: colors.lightGray,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

const SubmitButton = ({
  text, isLoading, disabled, onPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
      disabled={disabled || isLoading}
      onPress={onPress}
    >
      {isLoading ? <ActivityIndicator color="white" /> : (
        <Text style={styles.text}>
          {(text || '').toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

export default SubmitButton;
