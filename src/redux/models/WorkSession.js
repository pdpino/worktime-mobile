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

  getPrettyHourStart() {
    return unixToHour(this.timestampStart);
  }

  getPrettyHourEnd() {
    return unixToHour(this.timestampEnd);
  }

  delete() {
    const { subject } = this;
    this.sprintSet.delete();
    this.update({ subject: null });
    subject.update({ workSession: this }); // Properly deattach subject from this session
    super.delete();
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
