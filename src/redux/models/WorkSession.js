import { fk, attr, Model } from 'redux-orm';
import { unixToDateString, unixToHour } from '../../shared/utils';

class WorkSession extends Model {
  static start(timestamp, subjectId) {
    const { Subject, WorkSession } = this.session; // eslint-disable-line no-shadow
    const props = {
      date: unixToDateString(timestamp),
      timestampStart: timestamp,
      timestampEnd: timestamp,
      timeTotal: 0,
      timeEffective: 0,
      nPauses: 0,
      status: 'playing',
      subject: subjectId,
    };

    const workSession = WorkSession.create(props);
    Subject.withId(subjectId).update({ workSession });
    workSession.openSprint('playing');
    return workSession;
  }

  resume(timestamp) {
    this.closeCurrentSprint(timestamp);
    this.openSprint('playing');
    this.update({ status: 'playing' });
    this.updateSubject();
  }

  pause(timestamp) {
    this.closeCurrentSprint(timestamp);
    this.openSprint('paused');
    this.update({
      status: 'paused',
      nPauses: this.nPauses + 1,
    });
    this.updateSubject();
  }

  stop(timestamp) {
    this.closeCurrentSprint(timestamp);
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

  closeCurrentSprint(timestamp) {
    const duration = timestamp - this.timestampEnd;
    const lastSprint = this.sprintSet.last();
    lastSprint.close(duration);
    const addTimeEffective = lastSprint.status === 'playing' ? duration : 0;
    this.update({
      timestampEnd: timestamp,
      timeTotal: this.timeTotal + duration,
      timeEffective: this.timeEffective + addTimeEffective,
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
