import { createOrmSelector, ormSessionSelector } from './orm';

const runningSessionIdSelector = state => state.work.runningSessionId;

// eslint-disable-next-line import/prefer-default-export
export const runningSessionSelector = createOrmSelector(
  ormSessionSelector,
  runningSessionIdSelector,
  (ormSession, runningSessionId) => runningSessionId !== -1
    && ormSession.WorkSession.withId(runningSessionId),
);
