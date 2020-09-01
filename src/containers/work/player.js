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
  selectedSubjectAndCategorySelector,
  runningSessionSelector, lastRunningSessionSelector, subjectsSelector,
  categoriesSelector,
} from '../../redux/selectors';
import { alertDelete } from '../../shared/alerts';
import i18n from '../../shared/i18n';
import { getCategoriesWithSubjects } from '../../shared/utils/subjects';

export class WorkPlayer extends React.Component {
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
    const { selected } = this.props;
    const subject = selected && selected.subject;
    if (!subject) {
      return;
    }

    const status = this.getStatus();

    if (status === 'stopped') {
      this.props.start(subject);
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
      subjects, categories, selected, runningSession, lastRunningSession,
    } = this.props;
    const { timeTotal, timeEffective } = (runningSession || {});
    const {
      timeTotal: lastTimeTotal,
      timeEffective: lastTimeEffective,
    } = (lastRunningSession || {});

    const categoriesWithSubjects = getCategoriesWithSubjects(subjects, categories);

    return (
      <WorkPlayerComponent>
        <SubjectPickerComponent
          categoriesWithSubjects={categoriesWithSubjects}
          selected={selected}
          onValueChange={this.handleSelectSubject}
          disabled={status !== 'stopped'}
        />
        <StatusDisplayerComponent
          status={status}
          timeTotal={timeTotal || lastTimeTotal}
          timeEffective={timeEffective || lastTimeEffective}
        />
        <PlayerButtonsComponent
          playerEnabled={!!selected}
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

const mapStateToProps = (state) => ({
  subjects: subjectsSelector(state),
  categories: categoriesSelector(state),
  selected: selectedSubjectAndCategorySelector(state),
  runningSession: runningSessionSelector(state),
  lastRunningSession: lastRunningSessionSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  start,
  resume,
  pause,
  stop,
  stopAndDiscard,
  selectWorkSubject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkPlayer);
