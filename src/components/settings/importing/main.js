import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SubmitButton } from '../../../shared/UI/buttons';
import commonStyles from './styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonContainer: {
    alignSelf: 'center',
  },
});

// DICTIONARY
const importLabel = 'Import';

const Importing = ({
  isImporting, onPressImport, canPressImport, children,
}) => (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
    {children}
    <View style={[commonStyles.row, styles.submitButtonContainer]}>
      <SubmitButton
        text={importLabel}
        isLoading={isImporting}
        disabled={!canPressImport}
        onPress={onPressImport}
      />
    </View>
  </ScrollView>
);

export default Importing;
