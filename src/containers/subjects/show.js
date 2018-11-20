import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
import WorkSessionsListComponent from '../../components/workSessions/list';
import SubjectInfoComponent from '../../components/subjects/info';
import { subjectSessionsSelector } from '../../redux/selectors';
import { deleteWorkSession } from '../../redux/actions';

class SubjectShow extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteWorkSession = this.handleDeleteWorkSession.bind(this);
  }

  handleDeleteWorkSession(id) {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete the work session?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => this.props.deleteWorkSession(id) },
      ],
    );
  }

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
          onPressDelete={this.handleDeleteWorkSession}
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

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteWorkSession,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectShow);
