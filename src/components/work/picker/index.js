import React from 'react';
import { StyleSheet } from 'react-native';
import SubjectsCollection from '../../subjects/collection/subjectsCollection';
import asModalWithButton from '../../../shared/UI/pickers/modalWithButton';
import PickerButton from './button';

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
  },
});

class SubjectsList extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !nextProps.disabled;
  }

  render() {
    const {
      categoriesWithSubjects, onValueChange, closeModal,
    } = this.props;

    return (
      <SubjectsCollection
        listStyle={styles.list}
        categoriesWithSubjects={categoriesWithSubjects}
        selectedSubjects={{}}
        onPressSubject={(subject) => {
          closeModal();
          onValueChange(subject);
        }}
        onLongPressSubject={() => {}}
        onPressCategory={null}
        hideDescription
        littleAir
        hideEmptyCategories
      />
    );
  }
}

export default asModalWithButton(PickerButton, SubjectsList);
