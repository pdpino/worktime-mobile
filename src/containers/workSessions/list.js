import React from 'react';
import { connect } from 'react-redux';
import WorkSessionsListComponent from '../../components/workSessions/list';
import { workSessionsSelector } from '../../redux/selectors';

class WorkSessionsList extends React.Component {
  componentDidMount() {}

  render() {
    const { workSessions } = this.props;

    return (
      <WorkSessionsListComponent
        sessions={workSessions}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  workSessions: workSessionsSelector(state, {
    subject: ownProps.navigation.getParam('subject'),
  }),
});

export default connect(mapStateToProps)(WorkSessionsList);
