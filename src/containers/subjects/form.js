import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubjectFormComponent from '../../components/subjects/form';
import { upsertSubject, deleteSubjects } from '../../redux/actions';
import { categoriesSelector } from '../../redux/selectors';
import { HeaderActions } from '../../shared/UI/headers';
import { alertDelete } from '../../shared/alerts';
import i18n from '../../shared/i18n';

export class SubjectForm extends React.Component {
  constructor(props) {
    super(props);

    const {
      name, description, category, icon,
    } = this.props.subject || {};

    this.state = {
      name,
      description,
      categoryId: category ? category.id : -1,
      icon,
    };

    this.handleChangeName = this.getChangeHandler('name');
    this.handleChangeDescription = this.getChangeHandler('description');
    this.handleChangeCategory = this.getChangeHandler('categoryId');
    this.handleChangeIcon = this.getChangeHandler('icon');
  }

  componentDidMount() {
    if (!this.props.subject) return;

    const deleteSubjectAction = {
      icon: 'delete',
      handlePress: this.handleDeleteSubject,
    };

    this.props.navigation.setOptions({
      headerRight: () => <HeaderActions actions={[deleteSubjectAction]} />,
    });
  }

  getChangeHandler = (key) => (value) => {
    this.setState({ [key]: value });
  };

  getCategoryColor = () => {
    const { categories } = this.props;
    const { categoryId } = this.state;
    const category = categories && categories.find((cat) => cat.id === categoryId);
    return category && category.color;
  }

  isInputValid = () => {
    const { name } = this.state;
    return name && name.trim();
  }

  handleSubmitSubject = () => {
    if (!this.isInputValid()) {
      return;
    }

    const {
      name, description, categoryId, icon,
    } = this.state;

    const data = {
      name: name.trim(),
      description: description && description.trim(),
      category: categoryId,
      icon,
    };

    if (this.props.subject) {
      data.id = this.props.subject.id;
    } else {
      data.archived = false;
    }

    this.props.upsertSubject(data);
    this.props.navigation.goBack();
  }

  handleDeleteSubject = () => {
    const { subject } = this.props;

    if (!subject) {
      return;
    }
    alertDelete({
      title: i18n.t('deletion.deleteElementQuestion', {
        element: subject.name,
      }),
      toastMessage: i18n.t('deletion.elementDeleted', {
        element: subject.name,
      }),
      onDelete: () => {
        // NOTE: the navigation has to be before the deletion.
        // If the deletion goes first, the component may try to update,
        // and will fail since the props.subject will be null
        this.props.navigation.navigate('base-subjectsCollection');
        this.props.deleteSubjects([subject.id]);
      },
    });
  }

  render() {
    const {
      name, description, categoryId, icon,
    } = this.state;
    const { categories } = this.props;
    const canSubmit = this.isInputValid();
    const color = this.getCategoryColor();

    return (
      <SubjectFormComponent
        name={name}
        description={description}
        categoryId={categoryId}
        categories={categories}
        icon={icon}
        color={color}
        onChangeName={this.handleChangeName}
        onChangeDescription={this.handleChangeDescription}
        onChangeCategory={this.handleChangeCategory}
        onChangeIcon={this.handleChangeIcon}
        onSubmit={this.handleSubmitSubject}
        canSubmit={canSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  subject: ownProps.route.params && ownProps.route.params.subject,
  categories: categoriesSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  upsertSubject,
  deleteSubjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
