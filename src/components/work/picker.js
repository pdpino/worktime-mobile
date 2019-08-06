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

/**
 * Returns a formatted subject name, containing subject name and category name.
 *
 * If the subject has a category, the returned value is
 * "[category name] - [subject name]".
 * If the subject doesn't have a category, the returned value is the subject
 * name.
 */
const getNameWithCategory = (subject) => {
  if (subject.category) {
    return `${subject.category.getShortName()} - ${subject.name}`;
  }
  return subject.name;
};

/**
 * Formats the subjects for the picker.
 */
const formatSubjectsForPicker = subjects => subjects.map(subject => ({
  id: subject.id,
  name: getNameWithCategory(subject),
  hasCategory: !!subject.category,
})).sort((subj1, subj2) => {
  if (subj1.hasCategory && !subj2.hasCategory) {
    // Subjects with category go to the top (subj1)
    return -1;
  }
  if (!subj1.hasCategory && subj2.hasCategory) {
    // Subjects without category go to the bottom (subj1)
    return 1;
  }
  const name1 = subj1.name ? subj1.name.toLowerCase() : '';
  const name2 = subj2.name ? subj2.name.toLowerCase() : '';

  return name1 <= name2 ? -1 : 1;
});

class SubjectPicker extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      selectedSubjectId, enabled, subjects,
    } = this.props;

    return nextProps.selectedSubjectId !== selectedSubjectId
      || nextProps.enabled !== enabled
      || nextProps.subjects !== subjects;
  }

  render() {
    const {
      subjects, selectedSubjectId, onValueChange, enabled,
    } = this.props;

    const sortedSubjects = formatSubjectsForPicker(subjects);

    return (
      <View style={[commonStyles.box, styles.container]}>
        <Text style={styles.label}>
          {chooseSubject}
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            items={sortedSubjects}
            selectedId={selectedSubjectId}
            onValueChange={onValueChange}
            enabled={enabled}
            getDisplayName={getNameWithCategory}
          />
        </View>
      </View>
    );
  }
}

export default SubjectPicker;
