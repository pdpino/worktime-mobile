import _ from 'lodash';
import { fk, attr, Model } from 'redux-orm';
import {
  toLocalDate, prettyTimezoneOffset, timeToPrettyDate, prettyHour,
} from '../../shared/dates';

const portingWhiteList = [
  'device', 'timestampStart', 'timestampEnd', 'tzOffset',
  'timeTotal', 'timeEffective', 'nPauses', 'status',
];

function filterWhiteList(obj) {
  return _.pick(obj, portingWhiteList);
}

class WorkSession extends Model {
  static import(subject, importableWorkSession) {
    // eslint-disable-next-line no-shadow
    const { WorkSession, Sprint } = this.session;

    const workSession = WorkSession.create({
      subject: subject.id,
      ...filterWhiteList(importableWorkSession),
    });

    importableWorkSession.sprints
      .forEach((importableSprint) => Sprint
        .import(workSession, importableSprint));
  }

  static start(timestamp, tzOffset, subjectId, deviceName) {
    // eslint-disable-next-line no-shadow
    const { Subject, WorkSession } = this.session;
    const props = {
      timestampStart: timestamp,
      timestampEnd: timestamp,
      tzOffset,
      timeTotal: 0,
      timeEffective: 0,
      nPauses: 0,
      status: 'playing',
      device: deviceName,
      subject: subjectId,
    };

    const workSession = WorkSession.create(props);
    Subject.withId(subjectId).update({ workSession });
    workSession.openSprint('playing');
    return workSession;
  }

  resume(timestamp) {
    this.updateTimes(timestamp);
    this.openSprint('playing');
    this.update({ status: 'playing' });
    this.updateSubject();
  }

  pause(timestamp) {
    this.updateTimes(timestamp);
    this.openSprint('paused');
    this.update({
      status: 'paused',
      nPauses: this.nPauses + 1,
    });
    this.updateSubject();
  }

  stop(timestamp) {
    this.updateTimes(timestamp);
    this.update({ status: 'stopped' });
    this.updateSubject();
  }

  openSprint(status) {
    const { Sprint } = this.getClass().session;
    return Sprint.create({
      order: this.sprintSet.toRefArray().length,
      status,
      workSession: this.id,
    });
  }

  updateTimes(timestamp) {
    const duration = timestamp - this.timestampEnd;
    const lastSprint = this.sprintSet.last();
    lastSprint.addDuration(duration);
    const effectiveTimeToAdd = lastSprint.status === 'playing' ? duration : 0;
    this.update({
      timestampEnd: timestamp,
      timeTotal: this.timeTotal + duration,
      timeEffective: this.timeEffective + effectiveTimeToAdd,
    });
  }

  updateSubject() {
    this.subject.update({ workSession: this });
  }

  isPlaying() {
    return this.status === 'playing';
  }

  isPaused() {
    return this.status === 'paused';
  }

  isStopped() {
    return this.status === 'stopped';
  }

  getLocalStartDate() {
    return toLocalDate(this.timestampStart, this.tzOffset);
  }

  getLocalEndDate() {
    return toLocalDate(this.timestampEnd, this.tzOffset);
  }

  getPrettyTimezoneOffset() {
    return prettyTimezoneOffset(this.tzOffset);
  }

  getPrettyDate() {
    return timeToPrettyDate(this.timestampStart, this.tzOffset);
  }

  getPrettyHourStart() {
    return prettyHour(this.timestampStart, this.tzOffset);
  }

  getPrettyHourEnd() {
    return prettyHour(this.timestampEnd, this.tzOffset);
  }

  getSprints() {
    return this.sprintSet.toModelArray();
  }

  exportable() {
    return {
      ...filterWhiteList(this.ref),
      sprints: this.getSprints().map((sprint) => sprint.exportable()),
    };
  }

  delete() {
    const { subject } = this;
    this.sprintSet.delete();
    this.update({ subject: null });
    if (subject) {
      /* Properly deattach subject from this session */
      subject.update({ workSession: this });
    }
    super.delete();
  }
}

WorkSession.modelName = 'WorkSession';

WorkSession.fields = {
  id: attr(),
  device: attr(),
  timestampStart: attr(),
  timestampEnd: attr(),
  tzOffset: attr(),
  timeTotal: attr(),
  timeEffective: attr(),
  nPauses: attr(),
  status: attr(),
  subject: fk('Subject'),
};

export default WorkSession;
