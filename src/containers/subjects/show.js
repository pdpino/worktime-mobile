import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import WorkSessionsListComponent from '../../components/workSessions/list';
import SubjectInfoComponent from '../../components/subjects/info';
import { subjectSessionsSelector } from '../../redux/selectors';

class SubjectShow extends React.Component {
  componentDidMount() {}

  render() {
    const { workSessions } = this.props;
    const lastSession = workSessions[0];

    return (
      <ScrollView>
        <SubjectInfoComponent
          lastWorkedDate={lastSession && lastSession.date}
        />
        <WorkSessionsListComponent
          workSessions={workSessions}
          listProps={{ enableScroll: false }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  workSessions: subjectSessionsSelector(state, {
    subject: ownProps.navigation.getParam('subject'),
  }),
});

export default connect(mapStateToProps)(SubjectShow);
