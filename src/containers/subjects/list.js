import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import SubjectsListComponent from '../../components/subjects/list';
import { subjectsSelector } from '../../redux/selectors';

class SubjectsList extends Component {
  constructor(props) {
    super(props);

    this.findSubject = this.findSubject.bind(this);
    this.handlePressEditSubject = this.handlePressEditSubject.bind(this);
    this.handlePressDetailSubject = this.handlePressDetailSubject.bind(this);
    this.handlePressNewSubject = this.handlePressNewSubject.bind(this);
  }

  findSubject(id) {
    return this.props.subjects.find(subj => subj.id === id);
  }

  handlePressEditSubject(id) {
    const subject = this.findSubject(id);
    if (subject) {
      this.props.navigation.navigate('editSubject', { subject });
    }
  }

  handlePressDetailSubject(id) {
    const subject = this.findSubject(id);
    if (subject) {
      this.props.navigation.navigate('workSessions', { subject });
    }
  }

  handlePressNewSubject() {
    this.props.navigation.navigate('newSubject');
  }

  render() {
    const { subjects } = this.props;

    const newButtonText = 'New Subject'; // DICTIONARY

    return (
      <View style={{ flex: 1 }}>
        <SubjectsListComponent
          subjects={subjects}
          onPressDetail={this.handlePressDetailSubject}
          onPressEdit={this.handlePressEditSubject}
        />
        <Button
          title={newButtonText}
          onPress={this.handlePressNewSubject}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
});

export default connect(mapStateToProps)(SubjectsList);
