import { runningSessionIdSelector, lastWorkSessionSelector } from '../selectors';
import { getTimestamp } from '../../shared/utils';

export const start = subject => (dispatch, getState) => {
  dispatch({
    type: 'PLAYER/START',
    payload: {
      timestamp: getTimestamp(),
      subject,
    },
  });

  const runningSession = lastWorkSessionSelector(getState());

  return dispatch({
    type: 'SAVE_RUNNING_SESSION_ID',
    payload: {
      runningSessionId: runningSession.id,
    },
  });
};

export const selectWorkSubject = selectedSubjectId => ({
  type: 'SELECT_WORK_SUBJECT',
  payload: {
    selectedSubjectId,
  },
});

const createActionForRunningSession = type => () => (dispatch, getState) => {
  const runningSessionId = runningSessionIdSelector(getState());
  const timestamp = getTimestamp();
  return dispatch({
    type,
    payload: {
      timestamp,
      runningSessionId,
    },
  });
};

export const resume = createActionForRunningSession('PLAYER/RESUME');
export const pause = createActionForRunningSession('PLAYER/PAUSE');
export const stop = createActionForRunningSession('PLAYER/STOP');
