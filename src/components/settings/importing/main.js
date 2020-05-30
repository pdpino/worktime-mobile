import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SubmitButton } from '../../../shared/UI/buttons';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

const Importing = ({
  isImporting, onPressImport, canPressImport, children,
}) => (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
    {children}
    <SubmitButton
      text={i18n.t('porting.import')}
      isLoading={isImporting}
      disabled={!canPressImport}
      onPress={onPressImport}
    />
  </ScrollView>
);

export default Importing;
