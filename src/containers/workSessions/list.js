import React from 'react';
import { connect } from 'react-redux';
import WorkSessionsListComponent from '../../components/workSessions/list';
import { subjectSessionsSelector } from '../../redux/selectors';

class WorkSessionsList extends React.Component {
  componentDidMount() {}

  render() {
    const { workSessions } = this.props;

    return (
      <WorkSessionsListComponent
        workSessions={workSessions}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  workSessions: subjectSessionsSelector(state, {
    subject: ownProps.navigation.getParam('subject'),
  }),
});

export default connect(mapStateToProps)(WorkSessionsList);
