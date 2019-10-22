import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from './styles';
import { ModalPicker } from '../../shared/UI/pickers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 0,
    padding: 10,
    minWidth: 200,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'black',
    marginBottom: 5,
  },
  pickerText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  textDisabled: {
    color: 'gray',
  },
});

// DICTIONARY
const chooseSubject = 'Choose subject';

class SubjectPicker extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      selectedSubjectId, enabled, subjectsForPicker,
    } = this.props;

    return nextProps.selectedSubjectId !== selectedSubjectId
      || nextProps.enabled !== enabled
      || nextProps.subjectsForPicker !== subjectsForPicker;
  }

  render() {
    const {
      subjectsForPicker, selectedSubjectId, onValueChange, enabled,
    } = this.props;

    const PickerButton = ({ selectedName }) => (
      <View style={[commonStyles.box, styles.buttonContainer]}>
        <Text style={[styles.label, !enabled && styles.textDisabled]}>
          {chooseSubject}
        </Text>
        <Text style={[styles.pickerText, !enabled && styles.textDisabled]}>
          {selectedName}
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <ModalPicker
          items={subjectsForPicker}
          selectedId={selectedSubjectId}
          onValueChange={onValueChange}
          disabled={!enabled}
          ButtonComponent={PickerButton}
        />
      </View>
    );
  }
}

export default SubjectPicker;
