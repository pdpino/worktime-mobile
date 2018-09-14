import orm from '../models/orm';

export const start = (timestamp, subjectId) => (dispatch, getState) => {
  dispatch({
    type: 'START',
    payload: {
      timestamp,
      subjectId,
    },
  });

  const state = getState();
  const session = orm.session(state.entities);
  const { WorkSession } = session;

  const runningSession = WorkSession.all().last();

  return dispatch({
    type: 'SAVE_RUNNING_SESSION_ID',
    payload: {
      runningSessionId: runningSession.id,
    },
  });
};

export const resume = (timestamp, runningSessionId) => ({
  type: 'RESUME',
  payload: {
    timestamp,
    runningSessionId,
  },
});

export const pause = (timestamp, runningSessionId) => ({
  type: 'PAUSE',
  payload: {
    timestamp,
    runningSessionId,
  },
});

export const stop = (timestamp, runningSessionId) => ({
  type: 'STOP',
  payload: {
    timestamp,
    runningSessionId,
  },
});

export const selectWorkSubject = selectedSubjectId => ({
  type: 'SELECT_WORK_SUBJECT',
  payload: {
    selectedSubjectId,
  },
});
