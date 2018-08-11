import React, { Component } from 'react';
import SubjectsListComponent from '../../components/subjects/list';

const mockSubjects = [
  {
    id: 1,
    name: 'subject 1',
    description: 'working on subject 1',
  },
  {
    id: 2,
    name: 'subject 2',
    description: 'this is a very long description. It should use more than just one line. Hopefully it will use a couple of lines',
  },
];

class SubjectsList extends Component {
  constructor(props) {
    super(props);

    this.handlePressSubject = this.handlePressSubject.bind(this);
  }

  handlePressSubject(id) {
    const subject = mockSubjects.find(subj => subj.id === id);
    if (subject) {
      const { navigation } = this.props;
      navigation.navigate('subject', { subject });
    }
  }

  render() {
    return (
      <SubjectsListComponent
        subjects={mockSubjects}
        onPressSubject={this.handlePressSubject}
      />
    );
  }
}

export default SubjectsList;
