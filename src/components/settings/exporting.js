import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { SubmitButton } from '../../shared/UI/buttons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  row: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  helpText: {
    fontStyle: 'italic',
    fontSize: 16,
  },
});

const Exporting = ({ onPressExport }) => {
  // DICTIONARY
  const helpSection = (
    <View style={styles.row}>
      <Text style={styles.helpText}>
        Export your data to a file
      </Text>
    </View>
  );

  // DICTIONARY
  const exportButton = (
    <View style={styles.row}>
      <SubmitButton
        text="Export"
        onPress={onPressExport}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {helpSection}
      {exportButton}
    </View>
  );
};

export default Exporting;
