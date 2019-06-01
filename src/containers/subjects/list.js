import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Alert } from 'react-native';
import SubjectsListComponent from '../../components/subjects/list';
import { subjectsSelector } from '../../redux/selectors';
import { deleteSubjects } from '../../redux/actions';
import { NewButton } from '../../shared/UI/buttons';
import withItemSelection from '../../hoc/itemSelection';

class SubjectsList extends React.Component {
  static getSelectionActions(navigation, amountSelected) {
    return [
      {
        enabled: amountSelected === 1,
        icon: 'edit',
        handlePress: navigation.getParam('handleEditSelected'),
      },
      {
        enabled: true,
        icon: 'delete',
        handlePress: navigation.getParam('handleDeleteSelected'),
      },
    ];
  }

  static navigationOptions() {
    return {
      title: 'Subjects', // DICTIONARY
    };
  }

  constructor(props) {
    super(props);

    this.handleLongPressSubject = this.handleLongPressSubject.bind(this);
    this.handlePressSubject = this.handlePressSubject.bind(this);

    this.handlePressNewSubject = this.handlePressNewSubject.bind(this);
    this.handleEditSelected = this.handleEditSelected.bind(this);
    this.handleDeleteSelected = this.handleDeleteSelected.bind(this);

    this.props.navigation.setParams({
      handleEditSelected: this.handleEditSelected,
      handleDeleteSelected: this.handleDeleteSelected,
    });
  }

  findSubject(id) {
    const numericId = Number(id);
    return this.props.subjects.find(subj => subj.id === numericId);
  }

  handlePressSubject(id) {
    const { amountSelected } = this.props;
    if (amountSelected) {
      this.props.toggleSelection(id);
    } else {
      const subject = this.findSubject(id);
      if (subject) {
        this.props.navigation.navigate('showSubject', { subject });
      }
    }
  }

  handleLongPressSubject(id) {
    this.props.toggleSelection(id);
  }

  handlePressNewSubject() {
    if (this.props.amountSelected) {
      return;
    }
    this.props.navigation.navigate('newSubject');
  }

  handleEditSelected() {
    const selectedIds = this.props.getSelectionArray();
    if (selectedIds.length !== 1) {
      return;
    }

    const subject = this.findSubject(selectedIds[0]);
    if (subject) {
      this.props.clearSelection();
      this.props.navigation.navigate('editSubject', { subject });
    }
  }

  handleDeleteSelected() {
    const selectedIds = this.props.getSelectionArray();
    if (selectedIds.length === 0) {
      return;
    }

    let deletionSelected;
    if (selectedIds.length === 1) {
      const subject = this.findSubject(selectedIds[0]);
      deletionSelected = subject.name;
    } else {
      deletionSelected = `${selectedIds.length} subjects`;
    }

    // DICTIONARY
    Alert.alert(
      'Confirmation',
      `Delete ${deletionSelected}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            this.props.deleteSubjects(selectedIds);
            this.props.clearSelection();
          },
        },
      ],
    );
  }

  render() {
    const { subjects, selection, amountSelected } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <SubjectsListComponent
          subjects={subjects}
          selectedSubjects={selection}
          onPressSubject={this.handlePressSubject}
          onLongPressSubject={this.handleLongPressSubject}
        />
        <NewButton
          disabled={amountSelected > 0}
          onPress={this.handlePressNewSubject}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteSubjects,
}, dispatch);

export default withItemSelection(connect(
  mapStateToProps, mapDispatchToProps,
)(SubjectsList));
