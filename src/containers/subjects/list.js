import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import SubjectsListComponent from '../../components/subjects/list';
import { subjectsSelector } from '../../redux/selectors';

class SubjectsList extends Component {
  constructor(props) {
    super(props);

    this.handlePressSubject = this.handlePressSubject.bind(this);
    this.handleNewSubject = this.handleNewSubject.bind(this);
  }

  handlePressSubject(id) {
    const subject = this.props.subjects.find(subj => subj.id === id);
    if (subject) {
      this.props.navigation.navigate('workSessions', { subject });
    }
  }

  handleNewSubject() {
    this.props.navigation.navigate('newSubject');
  }

  render() {
    const { subjects } = this.props;

    const newButtonText = 'New Subject'; // DICTIONARY

    return (
      <View style={{ flex: 1 }}>
        <SubjectsListComponent
          subjects={subjects}
          onPressSubject={this.handlePressSubject}
        />
        <Button
          title={newButtonText}
          onPress={this.handleNewSubject}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
});

export default connect(mapStateToProps)(SubjectsList);
