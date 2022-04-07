import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BackHandler, Vibration } from 'react-native';
import SubjectsCollectionComponent from '../../components/subjects/collection';
import { subjectsSelector, categoriesSelector } from '../../redux/selectors';
import { archiveSubjects, deleteSubjects } from '../../redux/actions';
import { MultipleNewButton } from '../../shared/UI/buttons';
import {
  HeaderActions, getSelectionHeaderParams, revertHeaderParams,
} from '../../shared/UI/headers';
import afterInteractions from '../../hoc/afterInteractions';
import { alertDelete } from '../../shared/alerts';
import i18n from '../../shared/i18n';
import { colors } from '../../shared/styles';
import { getCategoriesWithSubjects } from '../../shared/utils/subjects';

function createSubjectsCollection(isArchive) {
  class SubjectsListContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        // NOTE: in selection-related methods, selectedIds is referred to an object;
        // in the other methods, selectedIds is usually an array of ids
        // (due to coupling of withSelection behavior)
        selectedIds: {},
        amountSelected: 0,
      };

      this.selectionActions = [
        {
          icon: 'edit',
          handlePress: this.handleEditSelected,
        },
        {
          icon: isArchive ? 'unarchive' : 'archive',
          handlePress: this.handleArchiveSelected,
        },
        {
          icon: 'delete',
          color: colors.deletionRedLighter,
          handlePress: this.handleDeleteSelected,
        },
      ];

      this.creationActions = [
        {
          title: i18n.t('entities.category'),
          handlePress: this.handlePressNewCategory,
          color: colors.red,
        },
        {
          title: i18n.t('entities.subject'),
          handlePress: this.handlePressNewSubject,
          color: colors.orange,
        },
      ];

      if (!isArchive) {
        const goToArchiveAction = {
          icon: 'archivedFolder',
          handlePress: this.handlePressArchive,
        };
        this.titleKey = 'entities.subjects'; // HACK: Titles copied from routes
        this.basicActions = [goToArchiveAction];
      } else {
        this.titleKey = 'archive';
        this.basicActions = null;
      }
    }

    componentDidMount() {
      this.addBackHandlerListener = this.props.navigation.addListener(
        'focus',
        () => BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      );

      this.removeBackHandlerListener = this.props.navigation.addListener(
        'blur',
        () => BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      );

      if (this.basicActions) {
        this.props.navigation.setOptions({
          headerRight: () => <HeaderActions actions={this.basicActions} />,
        });
      }
    }

    componentDidUpdate(_prevProps, prevState) {
      const { amountSelected } = this.state;
      if (amountSelected === prevState.amountSelected) {
        return;
      }

      if (amountSelected) {
        this.props.navigation.setOptions(getSelectionHeaderParams({
          amountSelected,
          actions: this.selectionActions,
          handleUnselection: this.handleUnselection,
        }));
      } else {
        const { route } = this.props;
        const back = !route.name.includes('base-'); // HACK copied from routes
        this.props.navigation.setOptions(revertHeaderParams({
          title: i18n.t(this.titleKey),
          actions: this.basicActions,
          back,
        }));
      }
    }

    componentWillUnmount() {
      if (this.addBackHandlerListener) {
        this.addBackHandlerListener();
      }
      if (this.removeBackHandlerListener) {
        this.removeBackHandlerListener();
      }
    }

    /* Selection methods */
    getSelectionArray = () => {
      const { selectedIds } = this.state;
      return Object.keys(selectedIds).filter((id) => selectedIds[id]);
    }

    updateSelection = (selectedIds, amountSelected) => {
      this.setState({
        selectedIds,
        amountSelected,
      });
    }

    toggleSelection = (id) => {
      const { selectedIds, amountSelected } = this.state;
      const isSelected = selectedIds[id];
      const newAmountSelected = amountSelected + (isSelected ? -1 : 1);

      if (amountSelected === 0 && newAmountSelected === 1) {
        Vibration.vibrate(40);
      }

      this.updateSelection({
        ...selectedIds,
        [id]: !isSelected,
      }, newAmountSelected);
    }

    handleUnselection = () => {
      this.updateSelection({}, 0);
    }

    handleBackPress = () => {
      if (this.state.amountSelected > 0) {
        this.handleUnselection();
        return true;
      }
      return false;
    }
    /* End of selection stuff */

    findSubject = (id) => {
      const numericId = Number(id);
      return this.props.subjects.find((subj) => subj.id === numericId);
    }

    findCategory = (id) => {
      const numericId = Number(id);
      return this.props.categories.find((category) => category.id === numericId);
    }

    handlePressSubject = (id) => {
      const { amountSelected } = this.state;
      if (amountSelected) {
        this.toggleSelection(id);
      } else {
        const subject = this.findSubject(id);
        if (subject) {
          this.props.navigation.navigate('showSubject', {
            subjectId: subject.id,
            subjectName: subject.name,
          });
        }
      }
    }

    handleLongPressSubject = (id) => {
      this.toggleSelection(id);
    }

    handlePressCategory = (id) => {
      if (this.state.amountSelected) {
        return;
      }
      const category = this.findCategory(id);
      if (category) {
        this.props.navigation.navigate('editCategory', { category });
      }
    }

    handlePressNewSubject = () => {
      if (isArchive || this.state.amountSelected) {
        return;
      }
      this.props.navigation.navigate('newSubject');
    }

    handlePressNewCategory = () => {
      if (isArchive || this.state.amountSelected) {
        return;
      }
      this.props.navigation.navigate('newCategory');
    }

    handleEditSelected = () => {
      const selectedIds = this.getSelectionArray();
      if (selectedIds.length > 1) {
        const { subjects, selection } = this.props;
        const selectedSubjects = subjects.filter((subj) => selection[subj.id]);

        this.handleUnselection();
        this.props.navigation.navigate('bulkEditSubject', {
          subjects: selectedSubjects,
        });
      } else {
        const subject = this.findSubject(selectedIds[0]);
        if (subject) {
          this.handleUnselection();
          this.props.navigation.navigate('editSubject', { subject });
        }
      }
    }

    handleArchiveSelected = () => {
      const selectedIds = this.getSelectionArray();
      if (selectedIds.length === 0) {
        return;
      }

      const archiving = !isArchive;
      this.props.archiveSubjects(selectedIds, archiving);
      this.handleUnselection();
    }

    handleDeleteSelected = () => {
      const selectedIds = this.getSelectionArray();
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

      alertDelete({
        title: i18n.t('deletion.deleteElementQuestion', {
          element: deletionSelected,
        }),
        toastMessage: i18n.t('deletion.elementDeleted', {
          element: deletionSelected,
        }),
        onDelete: () => {
          this.props.deleteSubjects(selectedIds);
          this.handleUnselection();
        },
      });
    }

    handlePressArchive = () => {
      if (isArchive) {
        return;
      }
      this.handleUnselection();
      this.props.navigation.navigate('subjectsArchiveCollection');
    }

    render() {
      const { subjects, categories } = this.props;
      const { amountSelected, selectedIds } = this.state;

      const categoriesWithSubjects = getCategoriesWithSubjects(
        subjects,
        categories,
      );

      return (
        <SubjectsCollectionComponent
          categoriesWithSubjects={categoriesWithSubjects}
          selectedSubjects={selectedIds}
          onPressSubject={this.handlePressSubject}
          onLongPressSubject={this.handleLongPressSubject}
          onPressCategory={this.handlePressCategory}
        >
          {!isArchive && (
            <MultipleNewButton
              disabled={amountSelected > 0}
              actions={this.creationActions}
            />
          )}
        </SubjectsCollectionComponent>
      );
    }
  }

  const mapStateToProps = (state) => ({
    subjects: subjectsSelector(state, { archived: isArchive }),
    categories: categoriesSelector(state),
  });

  const mapDispatchToProps = (dispatch) => bindActionCreators({
    archiveSubjects,
    deleteSubjects,
  }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(
    afterInteractions(SubjectsListContainer),
  );
}

export const NonArchivedSubjects = createSubjectsCollection(false);
export const ArchivedSubjects = createSubjectsCollection(true);
