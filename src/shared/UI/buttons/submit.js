import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 30,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  enabled: {
    backgroundColor: '#2196F3',
    elevation: 4,
  },
  disabled: {
    backgroundColor: '#DFDFDF',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

const SubmitButton = ({
  text, disabled, onPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {(text || '').toUpperCase()}
      </Text>
    </TouchableOpacity>
  </View>
);

export default SubmitButton;
