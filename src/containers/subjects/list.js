import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { SubjectsListComponent, SubjectsList } from '../../components/subjects/list';
import { subjectsSelector } from '../../redux/selectors';
import { archiveSubjects, deleteSubjects } from '../../redux/actions';
import { NewButton } from '../../shared/UI/buttons';
import { HeaderActions } from '../../shared/UI/headers';
import withItemSelection from '../../hoc/itemSelection';

export default function createSubjectsList(isArchive) {
  class SubjectsListContainer extends React.Component {
    static getSelectionActions(navigation, amountSelected) {
      return [
        {
          enabled: amountSelected === 1,
          icon: 'edit',
          handlePress: navigation.getParam('handleEditSelected'),
        },
        {
          enabled: true,
          icon: isArchive ? 'unarchive' : 'archive',
          handlePress: navigation.getParam('handleArchiveSelected'),
        },
        {
          enabled: true,
          icon: 'delete',
          handlePress: navigation.getParam('handleDeleteSelected'),
        },
      ];
    }

    static navigationOptions({ navigation }) {
      if (isArchive) {
        // DICTIONARY
        return {
          title: 'Archive',
        };
      }

      const actions = [
        {
          enabled: true,
          icon: 'archivedFolder',
          handlePress: navigation.getParam('handlePressArchive'),
        },
      ];

      // DICTIONARY
      return {
        title: 'Subjects',
        headerRight: <HeaderActions actions={actions} />,
      };
    }

    constructor(props) {
      super(props);

      this.handleLongPressSubject = this.handleLongPressSubject.bind(this);
      this.handlePressSubject = this.handlePressSubject.bind(this);

      this.handlePressNewSubject = this.handlePressNewSubject.bind(this);
      this.handleEditSelected = this.handleEditSelected.bind(this);
      this.handleArchiveSelected = this.handleArchiveSelected.bind(this);
      this.handleDeleteSelected = this.handleDeleteSelected.bind(this);

      this.handlePressArchive = this.handlePressArchive.bind(this);

      this.props.navigation.setParams({
        handleEditSelected: this.handleEditSelected,
        handleArchiveSelected: this.handleArchiveSelected,
        handleDeleteSelected: this.handleDeleteSelected,
        handlePressArchive: this.handlePressArchive,
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
      if (isArchive || this.props.amountSelected) {
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

    handleArchiveSelected() {
      const selectedIds = this.props.getSelectionArray();
      if (selectedIds.length === 0) {
        return;
      }

      const archiving = !isArchive;
      this.props.archiveSubjects(selectedIds, archiving);
      this.props.clearSelection();
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

    handlePressArchive() {
      if (isArchive) {
        return;
      }
      this.props.clearSelection();
      this.props.navigation.navigate('subjectsArchiveList');
    }

    render() {
      const { subjects, selection, amountSelected } = this.props;

      return (
        <SubjectsListComponent>
          <SubjectsList
            subjects={subjects}
            selectedSubjects={selection}
            isArchive={isArchive}
            onPressSubject={this.handlePressSubject}
            onLongPressSubject={this.handleLongPressSubject}
            onPressArchive={this.handlePressArchive}
          />
          {!isArchive && (
            <NewButton
              disabled={amountSelected > 0}
              onPress={this.handlePressNewSubject}
            />
          )}
        </SubjectsListComponent>
      );
    }
  }

  const mapStateToProps = state => ({
    subjects: subjectsSelector(state, { archived: isArchive }),
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    archiveSubjects,
    deleteSubjects,
  }, dispatch);

  return withItemSelection(
    connect(mapStateToProps, mapDispatchToProps)(SubjectsListContainer),
  );
}
