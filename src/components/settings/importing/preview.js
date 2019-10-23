import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { unixToDateString, unixToDaysAgo, prettyDate } from '../../../shared/utils';
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
    flex: 1,
    flexWrap: 'wrap',
  },
});

// DICTIONARY
const deviceLabel = 'Device';
const lastImportedLabel = 'Last imported';
const periodLabel = 'Period';

const ImportPreview = ({ device, importStats, lastImportedTimestamp }) => {
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
  let period = 'None'; // DICTIONARY
  if (importStats) {
    const fromDate = prettyDate(unixToDateString(importStats.minTimestamp));
    const toDate = prettyDate(unixToDateString(importStats.maxTimestamp));

    period = `${fromDate} -- ${toDate}`;
  }

  return device ? (
    <View style={commonStyles.row}>
      <View style={[styles.innerContainer, commonStyles.box]}>
        {getPreviewLabel(deviceLabel, device)}
        {getPreviewLabel(lastImportedLabel, lastImported)}
        {getPreviewLabel(periodLabel, period)}
      </View>
    </View>
  ) : null;
};

export default ImportPreview;
