import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  WorkPlayerComponent, SubjectPickerComponent, PlayerButtonsComponent, StatusDisplayerComponent,
} from '../../components/work';
import {
  start, resume, pause, stop, stopAndDiscard, selectWorkSubject,
} from '../../redux/actions';
import {
  subjectsForPickerSelector, selectedSubjectSelector,
  runningSessionSelector, lastRunningSessionSelector,
} from '../../redux/selectors';
import { alertDelete } from '../../shared/alerts';
import i18n from '../../shared/i18n';


class WorkPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectSubject = this.handleSelectSubject.bind(this);
    this.handlePressPlayPause = this.handlePressPlayPause.bind(this);
    this.handlePressStop = this.handlePressStop.bind(this);
    this.handleLongPressStop = this.handleLongPressStop.bind(this);
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

  handleLongPressStop() {
    if (this.getStatus() === 'stopped') {
      return;
    }
    alertDelete({
      title: i18n.t('deletion.discardSessionQuestion'),
      deleteMessage: i18n.t('deletion.stopAndDiscard'),
      toastMessage: i18n.t('deletion.discarded'),
      onDelete: () => this.props.stopAndDiscard(),
    });
  }

  handleSelectSubject(selectedSubjectId) {
    this.props.selectWorkSubject(selectedSubjectId);
  }

  render() {
    const status = this.getStatus();
    const {
      subjectsForPicker, selectedSubject, runningSession, lastRunningSession,
    } = this.props;
    const selectedSubjectId = selectedSubject ? selectedSubject.id : -1;
    const { timeTotal, timeEffective } = runningSession;
    const {
      timeTotal: lastTimeTotal,
      timeEffective: lastTimeEffective,
    } = lastRunningSession;

    return (
      <WorkPlayerComponent>
        <SubjectPickerComponent
          subjectsForPicker={subjectsForPicker}
          selectedSubjectId={selectedSubjectId}
          onValueChange={this.handleSelectSubject}
          enabled={status === 'stopped'}
        />
        <StatusDisplayerComponent
          status={status}
          timeTotal={timeTotal || lastTimeTotal}
          timeEffective={timeEffective || lastTimeEffective}
        />
        <PlayerButtonsComponent
          playerEnabled={selectedSubjectId !== -1}
          showPlay={status !== 'playing'}
          stopDisabled={status === 'stopped'}
          onPressPlayPause={this.handlePressPlayPause}
          onPressStop={this.handlePressStop}
          onLongPressStop={this.handleLongPressStop}
        />
      </WorkPlayerComponent>
    );
  }
}

const mapStateToProps = state => ({
  subjectsForPicker: subjectsForPickerSelector(state, { archived: false }),
  selectedSubject: selectedSubjectSelector(state),
  runningSession: runningSessionSelector(state),
  lastRunningSession: lastRunningSessionSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  start,
  resume,
  pause,
  stop,
  stopAndDiscard,
  selectWorkSubject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkPlayer);
