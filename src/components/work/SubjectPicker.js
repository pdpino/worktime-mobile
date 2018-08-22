import React from 'react';
import { StyleSheet, Picker } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});

const SubjectPicker = ({
  subjects, selectedSubjectId, onValueChange, pickerEnabled,
}) => {
  const subjectsList = subjects.map(subject => (
    <Picker.Item
      label={subject.name}
      value={subject.id}
      key={subject.id}
    />
  ));

  // DICTIONARY
  subjectsList.push(
    <Picker.Item
      label="None"
      value={-1}
      key={-1}
    />,
  );

  return (
    <Picker
      style={styles.picker}
      selectedValue={selectedSubjectId}
      onValueChange={itemValue => onValueChange(itemValue)}
      enabled={pickerEnabled}
    >
      {subjectsList}
    </Picker>
  );
};

export default SubjectPicker;
