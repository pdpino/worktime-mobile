import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

// DICTIONARY
const archivedLabel = 'Archived';

const ArchiveButton = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPress}
    >
      <Text style={styles.text}>
        {archivedLabel}
      </Text>
    </TouchableOpacity>
  </View>
);

export default ArchiveButton;
