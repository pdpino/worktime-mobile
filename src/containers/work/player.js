import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WorkPlayerComponent, SubjectPicker } from '../../components/work';
import {
  start, resume, pause, stop, selectWorkSubject,
} from '../../redux/actions';
import {
  subjectsSelector, runningSessionSelector, selectedSubjectSelector,
} from '../../redux/selectors';

class WorkPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.handlePressPlayPause = this.handlePressPlayPause.bind(this);
    this.handlePressStop = this.handlePressStop.bind(this);
    this.handleSelectSubject = this.handleSelectSubject.bind(this);
  }

  getStatus() {
    const { runningSession } = this.props;
    return runningSession ? runningSession.status : 'stopped';
    // HACK: 'stopped' copied from model
  }

  handlePressPlayPause() {
    const { selectedSubject } = this.props;
    if (!selectedSubject) {
      return;
    }

    const status = this.getStatus();

    if (status === 'stopped') {
      this.props.start(selectedSubject);
    } else if (status === 'playing') {
      this.props.pause();
    } else if (status === 'paused') {
      this.props.resume();
    }
  }

  handlePressStop() {
    if (this.getStatus() !== 'stopped') {
      this.props.stop();
    }
  }

  handleSelectSubject(selectedSubjectId) {
    this.props.selectWorkSubject(selectedSubjectId);
  }

  render() {
    const status = this.getStatus();
    const { subjects, selectedSubject } = this.props;
    const selectedSubjectId = selectedSubject ? selectedSubject.id : -1;

    return (
      <WorkPlayerComponent
        picker={(
          <SubjectPicker
            subjects={subjects}
            selectedSubjectId={selectedSubjectId}
            onValueChange={this.handleSelectSubject}
            pickerEnabled={status === 'stopped'}
          />
        )}
        status={status}
        playerEnabled={selectedSubjectId !== -1}
        showPlay={status !== 'playing'}
        stopDisabled={status === 'stopped'}
        onPressPlayPause={this.handlePressPlayPause}
        onPressStop={this.handlePressStop}
      />
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
  runningSession: runningSessionSelector(state),
  selectedSubject: selectedSubjectSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  start,
  resume,
  pause,
  stop,
  selectWorkSubject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkPlayer);
