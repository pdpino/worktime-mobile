import React from 'react';
import SubjectShowComponent from '../../components/subjects/show';

class SubjectShow extends React.Component {
  componentDidMount() {

  }

  render() {
    const { navigation } = this.props;
    const { subject } = navigation.state.params;

    return (
      <SubjectShowComponent
        subject={subject}
      />
    );
  }
}

export default SubjectShow;
