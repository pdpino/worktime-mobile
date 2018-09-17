import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DashboardComponent from '../../components/dashboard/main';
import { workSessionsSelector } from '../../redux/selectors';

class Dashboard extends React.Component {
  static sumTimes(workSessions) {
    let total = 0;
    let effective = 0;
    workSessions.forEach((workSession) => {
      total += workSession.timeTotal;
      effective += workSession.timeEffective;
    });

    return {
      total,
      effective,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      initialDate: moment(),
      endingDate: moment(),
    };
  }

  filterWorkSessions() {
    const { initialDate, endingDate } = this.state;
    return this.props.workSessions.filter(workSession => moment(workSession.date, 'L')
      .isBetween(initialDate, endingDate, 'day', '[]'));
  }

  render() {
    const { initialDate, endingDate } = this.state;
    const workSessions = this.filterWorkSessions();
    const times = Dashboard.sumTimes(workSessions);

    return (
      <DashboardComponent
        timeTotal={times.total}
        timeEffective={times.effective}
        initialDate={initialDate}
        endingDate={endingDate}
      />
    );
  }
}

const mapStateToProps = state => ({
  workSessions: workSessionsSelector(state),
});

export default connect(mapStateToProps)(Dashboard);
