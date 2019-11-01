import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { SubjectsListComponent, SubjectsList } from '../../components/subjects/list';
import { subjectsSelector, categoriesSelector } from '../../redux/selectors';
import { archiveSubjects, deleteSubjects } from '../../redux/actions';
import { MultipleNewButton } from '../../shared/UI/buttons';
import { HeaderActions } from '../../shared/UI/headers';
import { getSubjectsAsSectionList } from '../../shared/utils';
import withItemSelection from '../../hoc/itemSelection';

export default function createSubjectsList(isArchive) {
  class SubjectsListContainer extends React.Component {
    static getSelectionActions(navigation) {
      return [
        {
          enabled: true,
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

      this.handlePressSubject = this.handlePressSubject.bind(this);
      this.handleLongPressSubject = this.handleLongPressSubject.bind(this);
      this.handlePressCategory = this.handlePressCategory.bind(this);

      this.handlePressNewSubject = this.handlePressNewSubject.bind(this);
      this.handlePressNewCategory = this.handlePressNewCategory.bind(this);
      this.handlePressArchive = this.handlePressArchive.bind(this);

      this.handleEditSelected = this.handleEditSelected.bind(this);
      this.handleArchiveSelected = this.handleArchiveSelected.bind(this);
      this.handleDeleteSelected = this.handleDeleteSelected.bind(this);

      this.props.navigation.setParams({
        handleEditSelected: this.handleEditSelected,
        handleArchiveSelected: this.handleArchiveSelected,
        handleDeleteSelected: this.handleDeleteSelected,
        handlePressArchive: this.handlePressArchive,
      });

      // DICTIONARY
      // COLORS
      this.newActions = [
        {
          title: 'Category',
          handlePress: this.handlePressNewCategory,
          color: '#d50000',
        },
        {
          title: 'Subject',
          handlePress: this.handlePressNewSubject,
          color: '#ef8c00',
        },
      ];
    }

    findSubject(id) {
      const numericId = Number(id);
      return this.props.subjects.find(subj => subj.id === numericId);
    }

    findCategory(id) {
      const numericId = Number(id);
      return this.props.categories.find(category => category.id === numericId);
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

    handlePressCategory(id) {
      if (this.props.amountSelected) {
        return;
      }
      const category = this.findCategory(id);
      if (category) {
        this.props.navigation.navigate('categoryForm', { category });
      }
    }

    handlePressNewSubject() {
      if (isArchive || this.props.amountSelected) {
        return;
      }
      this.props.navigation.navigate('newSubject');
    }

    handlePressNewCategory() {
      if (isArchive || this.props.amountSelected) {
        return;
      }
      this.props.navigation.navigate('categoryForm');
    }

    handleEditSelected() {
      const selectedIds = this.props.getSelectionArray();
      if (selectedIds.length > 1) {
        const { subjects, selection } = this.props;
        const selectedSubjects = subjects.filter(subj => selection[subj.id]);

        this.props.clearSelection();
        this.props.navigation.navigate('bulkEditSubject', {
          subjects: selectedSubjects,
        });
      } else {
        const subject = this.findSubject(selectedIds[0]);
        if (subject) {
          this.props.clearSelection();
          this.props.navigation.navigate('editSubject', { subject });
        }
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
      const {
        subjects, categories, selection, amountSelected,
      } = this.props;

      const subjectsByCategories = getSubjectsAsSectionList(
        subjects,
        categories,
      );

      return (
        <SubjectsListComponent>
          <SubjectsList
            subjectsByCategories={subjectsByCategories}
            selectedSubjects={selection}
            onPressSubject={this.handlePressSubject}
            onLongPressSubject={this.handleLongPressSubject}
            onPressCategory={this.handlePressCategory}
          />
          {!isArchive && (
            <MultipleNewButton
              disabled={amountSelected > 0}
              actions={this.newActions}
            />
          )}
        </SubjectsListComponent>
      );
    }
  }

  const mapStateToProps = state => ({
    subjects: subjectsSelector(state, { archived: isArchive }),
    categories: categoriesSelector(state),
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    archiveSubjects,
    deleteSubjects,
  }, dispatch);

  return withItemSelection(
    connect(mapStateToProps, mapDispatchToProps)(SubjectsListContainer),
  );
}
