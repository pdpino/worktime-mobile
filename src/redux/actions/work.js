import {
  runningSessionIdSelector, lastWorkSessionSelector, selectedSubjectSelector,
} from '../selectors';
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

const createActionForRunningSession = (type, sendSubject) => () => (dispatch, getState) => {
  const store = getState();
  const runningSessionId = runningSessionIdSelector(store);
  const timestamp = getTimestamp();
  return dispatch({
    type,
    payload: {
      subject: sendSubject && selectedSubjectSelector(store),
      timestamp,
      runningSessionId,
    },
  });
};

export const resume = createActionForRunningSession('PLAYER/RESUME', true);
export const pause = createActionForRunningSession('PLAYER/PAUSE', true);
export const stop = createActionForRunningSession('PLAYER/STOP', false);
export const stopAndDiscard = createActionForRunningSession('PLAYER/STOP_DISCARD', false);
