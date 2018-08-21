import { createOrmSelector, ormSessionSelector } from './orm';

const runningSessionIdSelector = state => state.work.runningSessionId;

export const runningSessionSelector = createOrmSelector(
  ormSessionSelector,
  runningSessionIdSelector,
  (ormSession, runningSessionId) => runningSessionId !== -1
    && ormSession.WorkSession.withId(runningSessionId),
);

export const selectedSubjectIdSelector = state => state.work.selectedSubjectId;
