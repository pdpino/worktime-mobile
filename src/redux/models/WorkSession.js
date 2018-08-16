import { fk, attr, Model } from 'redux-orm';
import { getDate, getHour } from '../../shared/utils';

class WorkSession extends Model {
  static start(timestamp, subjectId) {
    const { WorkSession } = this.session; // eslint-disable-line no-shadow
    const props = {
      date: getDate(timestamp),
      timeStart: timestamp,
      timeEnd: timestamp,
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
    const duration = timestamp - this.timeEnd;
    this.sprintSet.last().close(duration);
    return this.update({
      timeEnd: timestamp,
    });
  }

  getTotalSeconds() {
    return this.timeEnd - this.timeStart;
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
    return getHour(this.timeStart);
  }

  getHourEnd() {
    return getHour(this.timeEnd);
  }
}

WorkSession.modelName = 'WorkSession';

WorkSession.fields = {
  id: attr(),
  date: attr(),
  timeStart: attr(),
  timeEnd: attr(),
  status: attr(),
  subject: fk('Subject'),
};

export default WorkSession;
