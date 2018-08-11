import React, { Component } from 'react';
import SubjectsListComponent from '../components/SubjectsList';

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
    // TODO: get subject and navigate
    console.log('NAVIGATING SUBJECT: ', id);
    console.log('PROPS: ', this.props);
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
