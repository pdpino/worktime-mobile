import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WorkPlayerComponent from '../../components/work/player';
import {
  start, resume, pause, stop,
} from '../../redux/actions';
import { runningSessionSelector } from '../../redux/selectors';
import { getTimestamp } from '../../shared/utils';

class WorkPlayer extends React.Component {
  constructor(props) {
    super(props);

    // TODO: allow going back only if stopped

    this.handlePressPlayPause = this.handlePressPlayPause.bind(this);
    this.handlePressStop = this.handlePressStop.bind(this);
  }

  getStatus() {
    const { runningSession } = this.props;
    return runningSession ? runningSession.status : 'stopped';
    // HACK: stopped copied from model
  }

  handlePressPlayPause() {
    const { subject, runningSession } = this.props;
    const status = this.getStatus();
    const timestamp = getTimestamp();

    if (status === 'stopped') {
      this.props.start(timestamp, subject.id);
    } else if (status === 'playing') {
      this.props.pause(timestamp, runningSession.id);
    } else if (status === 'paused') {
      this.props.resume(timestamp, runningSession.id);
    }
  }

  handlePressStop() {
    const { runningSession } = this.props;
    this.props.stop(getTimestamp(), runningSession.id);
  }

  render() {
    const status = this.getStatus();

    return (
      <WorkPlayerComponent
        status={status}
        showPlay={status !== 'playing'}
        stopDisabled={status === 'stopped'}
        onPressPlayPause={this.handlePressPlayPause}
        onPressStop={this.handlePressStop}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  subject: ownProps.navigation.getParam('subject'),
  runningSession: runningSessionSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  start,
  resume,
  pause,
  stop,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkPlayer);
