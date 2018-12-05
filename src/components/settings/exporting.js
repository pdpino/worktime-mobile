import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const Exporting = ({ onPressShare }) => {
  console.log('EXPORTING COMPONENT');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressShare}
      >
        <Text>
          hola
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Exporting;
