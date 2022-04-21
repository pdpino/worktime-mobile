import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import FileInput from './fileInput';
import LoadingPreview from './loading';
import ImportPreview from './preview';
import SubjectsPreview from './subjects';
import KnownDevices from './devices';
import ImportButton from './button';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

const ImportingComponent = ({ children }) => (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
    {children}
  </ScrollView>
);

export {
  ImportingComponent,
  FileInput,
  LoadingPreview,
  ImportPreview,
  SubjectsPreview,
  KnownDevices,
  ImportButton,
};
