import { fk, attr, Model } from 'redux-orm';
import { unixToDate, unixToHour } from '../../shared/utils';

class WorkSession extends Model {
  static start(timestamp, subjectId) {
    const { WorkSession } = this.session; // eslint-disable-line no-shadow
    const props = {
      date: unixToDate(timestamp),
      timestampStart: timestamp,
      timestampEnd: timestamp,
      timeTotal: 0,
      timeEffective: 0,
      nPauses: 0,
      status: 'playing',
      subject: subjectId,
    };

    const workSession = WorkSession.create(props);
    workSession.openSprint('playing');
    return workSession;
  }

  resume(timestamp) {
    this.closeCurrentSprint(timestamp);
    this.openSprint('playing');
    return this.update({ status: 'playing' });
  }

  pause(timestamp) {
    this.closeCurrentSprint(timestamp);
    this.openSprint('paused');
    return this.update({
      status: 'paused',
      nPauses: this.nPauses + 1,
    });
  }

  stop(timestamp) {
    this.closeCurrentSprint(timestamp);
    return this.update({ status: 'stopped' });
  }

  openSprint(status) {
    const { Sprint } = this.getClass().session;
    return Sprint.create({
      order: this.sprintSet.toRefArray().length,
      status,
      workSession: this.id,
    });
  }

  closeCurrentSprint(timestamp) {
    const duration = timestamp - this.timestampEnd;
    const lastSprint = this.sprintSet.last();
    lastSprint.close(duration);
    const addTimeEffective = lastSprint.status === 'playing' ? duration : 0;
    return this.update({
      timestampEnd: timestamp,
      timeTotal: this.timeTotal + duration,
      timeEffective: this.timeEffective + addTimeEffective,
    });
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

  getHourStart() {
    return unixToHour(this.timestampStart);
  }

  getHourEnd() {
    return unixToHour(this.timestampEnd);
  }
}

WorkSession.modelName = 'WorkSession';

WorkSession.fields = {
  id: attr(),
  date: attr(),
  timestampStart: attr(),
  timestampEnd: attr(),
  timeTotal: attr(),
  timeEffective: attr(),
  nPauses: attr(),
  status: attr(),
  subject: fk('Subject'),
};

export default WorkSession;
