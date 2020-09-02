import {
  runningSessionIdSelector, lastWorkSessionSelector, selectedSubjectSelector,
  profileSelector,
} from '../selectors';
import { getTimestamp, getTimezoneOffset, getTimezoneName } from '../../shared/dates';

const createActionForRunningSession = (
  type,
  sendSubject,
) => () => (dispatch, getState) => {
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
export const updateWorkTimes = createActionForRunningSession('PLAYER/UPDATE_TIMES', false);

export const start = (subject) => (dispatch, getState) => {
  dispatch({
    type: 'PLAYER/STARTING',
    payload: {
      timestamp: getTimestamp(),
      tzOffset: getTimezoneOffset(),
      tzName: getTimezoneName(),
      subject,
      deviceName: profileSelector(getState()).deviceName,
    },
  });

  const runningSession = lastWorkSessionSelector(getState());
  return dispatch({
    type: 'PLAYER/STARTED',
    payload: {
      runningSessionId: runningSession.id,
      timestamp: getTimestamp(),
    },
  });
};

export const selectWorkSubject = (selectedSubjectId) => ({
  type: 'SELECT_WORK_SUBJECT',
  payload: {
    selectedSubjectId,
  },
});
