import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import WorkSessionsListComponent from '../../components/workSessions/list';
import SubjectInfoComponent from '../../components/subjects/info';
import { subjectSessionsSelector } from '../../redux/selectors';

class SubjectShow extends React.Component {
  componentDidMount() {}

  render() {
    const { subject, workSessions } = this.props;
    const lastSession = workSessions[0];
    const daysWorked = {};
    const { timeTotal, timeEffective } = subject.sumTimes(null, null, daysWorked);

    return (
      <ScrollView>
        <SubjectInfoComponent
          lastWorkedDate={lastSession && lastSession.date}
          timeTotal={timeTotal}
          timeEffective={timeEffective}
          nDaysWorked={Object.keys(daysWorked).length}
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
  subject: ownProps.navigation.getParam('subject'), // HACK? repeated
});

export default connect(mapStateToProps)(SubjectShow);
