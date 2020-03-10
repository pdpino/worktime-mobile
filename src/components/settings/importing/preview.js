import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { timeToPrettyDate } from '../../../shared/dates';
import i18n from '../../../shared/i18n';
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

  const lastImported = lastImportedTimestamp
    ? timeToPrettyDate(lastImportedTimestamp)
    : i18n.t('never');
  let period = i18n.t('none');
  if (importStats) {
    const fromDate = timeToPrettyDate(importStats.minTimestamp);
    const toDate = timeToPrettyDate(importStats.maxTimestamp);

    period = `${fromDate} -- ${toDate}`;
  }

  return device ? (
    <View style={commonStyles.row}>
      <View style={[styles.innerContainer, commonStyles.box]}>
        {getPreviewLabel(i18n.t('device'), device)}
        {getPreviewLabel(i18n.t('porting.lastImported'), lastImported)}
        {getPreviewLabel(i18n.t('times.period'), period)}
      </View>
    </View>
  ) : null;
};

export default ImportPreview;
