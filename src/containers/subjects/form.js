import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import SubjectFormComponent from '../../components/subjects/form';
import { upsertSubject, deleteSubjects } from '../../redux/actions';
import { categoriesSelector } from '../../redux/selectors';
import { HeaderActions } from '../../shared/UI/headers';

class SubjectForm extends React.Component {
  static navigationOptions({ navigation }) {
    const subject = navigation.getParam('subject');

    if (!subject) {
      return {
        title: 'New Subject', // DICTIONARY
      };
    }

    const actions = [
      {
        icon: 'delete',
        handlePress: navigation.getParam('handleDeleteSubject'),
      },
    ];

    return {
      title: 'Edit Subject', // DICTIONARY
      headerRight: <HeaderActions actions={actions} />,
    };
  }

  constructor(props) {
    super(props);

    const { name, description, category } = this.props.subject || {};

    this.state = {
      name,
      description,
      categoryId: category ? category.id : -1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSubject = this.handleSubmitSubject.bind(this);

    this.handleDeleteSubject = this.handleDeleteSubject.bind(this);

    this.props.navigation.setParams({
      handleDeleteSubject: this.handleDeleteSubject,
    });
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

    const { name, description, categoryId } = this.state;

    const data = {
      name: name.trim(),
      description: description && description.trim(),
      category: categoryId,
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

    // DICTIONARY
    Alert.alert(
      'Confirmation',
      `Delete ${subject.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            this.props.navigation.goBack();
            this.props.deleteSubjects([subject.id]);
          },
        },
      ],
    );
  }

  render() {
    const { name, description, categoryId } = this.state;
    const { categories } = this.props;
    const canSubmit = this.isInputValid();

    return (
      <SubjectFormComponent
        name={name}
        description={description}
        categoryId={categoryId}
        categories={categories}
        onChangeName={this.handleChange('name')}
        onChangeDescription={this.handleChange('description')}
        onChangeCategory={this.handleChange('categoryId')}
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

const mapDispatchToProps = dispatch => bindActionCreators({
  upsertSubject,
  deleteSubjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
