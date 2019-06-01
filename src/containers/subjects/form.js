import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubjectFormComponent from '../../components/subjects/form';
import { upsertSubject } from '../../redux/actions';

class SubjectForm extends React.Component {
  constructor(props) {
    super(props);

    const { name, description } = this.props.subject || {};

    this.state = {
      name,
      description,
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
    const data = {
      ...this.state,
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
    const { name, description } = this.state;
    const canSubmit = this.validChanges();

    return (
      <SubjectFormComponent
        name={name}
        description={description}
        onChangeName={this.handleChange('name')}
        onChangeDescription={this.handleChange('description')}
        onSubmit={this.handleSubmitSubject}
        canSubmit={canSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  subject: ownProps.navigation.getParam('subject'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  upsertSubject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
