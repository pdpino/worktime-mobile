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
  static navigationOptions({ navigation }) {
    const subject = navigation.getParam('subject');

    if (!subject) {
      return {
        title: i18n.t('entities.newSubject'),
      };
    }

    const actions = [
      {
        icon: 'delete',
        handlePress: navigation.getParam('handleDeleteSubject'),
      },
    ];

    return {
      title: i18n.t('entities.editSubject'),
      headerRight: () => <HeaderActions actions={actions} />,
    };
  }

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

    this.handleChangeName = this.handleChange('name');
    this.handleChangeDescription = this.handleChange('description');
    this.handleChangeCategory = this.handleChange('categoryId');
    this.handleChangeIcon = this.handleChange('icon');

    this.handleSubmitSubject = this.handleSubmitSubject.bind(this);
    this.handleDeleteSubject = this.handleDeleteSubject.bind(this);

    this.props.navigation.setParams({
      handleDeleteSubject: this.handleDeleteSubject,
    });
  }

  getCategoryColor() {
    const { categories } = this.props;
    const { categoryId } = this.state;
    const category = categories && categories.find((cat) => cat.id === categoryId);
    return category && category.color;
  }

  isInputValid() {
    const { name } = this.state;
    return name && name.trim();
  }

  handleChange(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  handleSubmitSubject() {
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

  handleDeleteSubject() {
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
        this.props.navigation.navigate('subjectsCollection');
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
  subject: ownProps.navigation.getParam('subject'),
  categories: categoriesSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  upsertSubject,
  deleteSubjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
