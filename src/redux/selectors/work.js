import { createOrmSelector, ormSessionSelector } from './orm';

export const runningSessionIdSelector = state => state.work.runningSessionId;
export const lastRunningSessionIdSelector = state => state.work.lastRunningSessionId;
const selectedSubjectIdSelector = state => state.work.selectedSubjectId;

export const runningSessionSelector = createOrmSelector(
  ormSessionSelector,
  runningSessionIdSelector,
  (ormSession, id) => id !== -1 && ormSession.WorkSession.withId(id),
);

export const lastRunningSessionSelector = createOrmSelector(
  ormSessionSelector,
  lastRunningSessionIdSelector,
  (ormSession, id) => id !== -1 && ormSession.WorkSession.idExists(id)
    && ormSession.WorkSession.withId(id),
);

export const selectedSubjectSelector = createOrmSelector(
  ormSessionSelector,
  selectedSubjectIdSelector,
  (ormSession, selectedSubjectId) => selectedSubjectId !== -1
    && ormSession.Subject.withId(selectedSubjectId),
);
