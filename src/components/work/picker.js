import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from './styles';
import { Picker } from '../../shared/UI/pickers';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 80,
    width: 200,
  },
  label: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
  },
});

// DICTIONARY
const chooseSubject = 'Choose a Subject';

const SubjectPicker = ({
  subjects, selectedSubjectId, onValueChange, enabled,
}) => (
  <View style={[commonStyles.box, styles.container]}>
    <Text style={styles.label}>
      {chooseSubject}
    </Text>
    <View style={styles.pickerContainer}>
      <Picker
        items={subjects}
        selectedId={selectedSubjectId}
        onValueChange={onValueChange}
        enabled={enabled}
      />
    </View>
  </View>
);

export default SubjectPicker;