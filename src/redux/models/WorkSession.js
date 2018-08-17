import { fk, attr, Model } from 'redux-orm';
import { unixToDate, unixToHour } from '../../shared/utils';

class WorkSession extends Model {
  static start(timestamp, subjectId) {
    const { WorkSession } = this.session; // eslint-disable-line no-shadow
    const props = {
      date: unixToDate(timestamp),
      timestampStart: timestamp,
      timestampEnd: timestamp,
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
    return this.update({ status: 'paused' });
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
    this.sprintSet.last().close(duration);
    return this.update({
      timestampEnd: timestamp,
    });
  }

  getTotalSeconds() {
    return this.timestampEnd - this.timestampStart;
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
  status: attr(),
  subject: fk('Subject'),
};

export default WorkSession;
