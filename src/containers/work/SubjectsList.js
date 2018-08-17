import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectWorkComponent from '../../components/work/SubjectsList';
import { subjectsSelector } from '../../redux/selectors';

class SelectWork extends Component {
  constructor(props) {
    super(props);

    this.handlePressSubject = this.handlePressSubject.bind(this);
  }

  handlePressSubject(id) {
    const subject = this.props.subjects.find(subj => subj.id === id);
    if (subject) {
      this.props.navigation.navigate('work', { subject });
    }
  }

  render() {
    const { subjects } = this.props;

    return (
      <SelectWorkComponent
        subjects={subjects}
        onPressSubject={this.handlePressSubject}
      />
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
});

export default connect(mapStateToProps)(SelectWork);
