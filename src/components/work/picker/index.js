import React from 'react';
import SubjectsCollection from '../../subjects/collection/subjectsCollection';
import asModalWithButton from '../../../shared/UI/pickers/modalWithButton';
import PickerButton from './button';

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
        containerStyle={{ backgroundColor: 'white' }}
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
