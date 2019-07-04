import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubjectFormComponent from '../../components/subjects/form';
import { upsertSubject } from '../../redux/actions';
import { categoriesSelector } from '../../redux/selectors';

class SubjectForm extends React.Component {
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
  }

  validChanges() {
    return this.state.name;
  }

  handleChange(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  handleSubmitSubject() {
    if (!this.validChanges()) {
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

  render() {
    const { name, description, categoryId } = this.state;
    const { categories } = this.props;
    const canSubmit = this.validChanges();

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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
