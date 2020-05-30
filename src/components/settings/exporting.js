import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { SubmitButton } from '../../shared/UI/buttons';
import i18n from '../../shared/i18n';

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

const Exporting = ({ isPreparingData, onPressExport }) => {
  const helpSection = (
    <View style={styles.row}>
      <Text style={styles.helpText}>
        {i18n.t('porting.exportYourDataToFile')}
      </Text>
    </View>
  );

  const exportButton = (
    <SubmitButton
      text={i18n.t('porting.export')}
      isLoading={isPreparingData}
      onPress={onPressExport}
    />
  );

  return (
    <View style={styles.container}>
      {helpSection}
      {exportButton}
    </View>
  );
};

export default Exporting;
