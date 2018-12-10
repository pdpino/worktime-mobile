import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 40,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  enabled: {
    backgroundColor: '#2196F3',
  },
  disabled: {
    backgroundColor: 'gray',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

const SubmitButton = ({
  text, disabled, onPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  </View>
);

export default SubmitButton;
