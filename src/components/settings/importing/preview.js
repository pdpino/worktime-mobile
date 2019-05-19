import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { unixToDaysAgo } from '../../../shared/utils';
import commonStyles from './styles';

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  fieldLabel: {
    color: 'black',
    fontSize: 18,
  },
  fieldValue: {
    color: 'gray',
    fontStyle: 'italic',
    marginLeft: 10,
    fontSize: 18,
  },
});

// DICTIONARY
const deviceLabel = 'Device';
const lastImportedLabel = 'Last imported';

const ImportPreview = ({ device, lastImportedTimestamp }) => {
  const getPreviewLabel = (label, value) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>
        {label}
        :
      </Text>
      <Text style={styles.fieldValue}>
        {value}
      </Text>
    </View>
  );

  const lastImported = unixToDaysAgo(lastImportedTimestamp);

  return device ? (
    <View style={commonStyles.row}>
      <View style={[styles.innerContainer, commonStyles.box]}>
        {getPreviewLabel(deviceLabel, device)}
        {getPreviewLabel(lastImportedLabel, lastImported)}
      </View>
    </View>
  ) : null;
};

export default ImportPreview;
