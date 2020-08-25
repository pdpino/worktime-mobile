import { createOrmSelector } from './orm';

export const runningSessionIdSelector = (state) => state.work.runningSessionId;
export const lastRunningSessionIdSelector = (state) => state.work.lastRunningSessionId;
const selectedSubjectIdSelector = (state) => state.work.selectedSubjectId;

export const runningSessionSelector = createOrmSelector(
  runningSessionIdSelector,
  (ormSession, id) => id !== -1 && ormSession.WorkSession.withId(id),
);

export const lastRunningSessionSelector = createOrmSelector(
  lastRunningSessionIdSelector,
  (ormSession, id) => id !== -1 && ormSession.WorkSession.idExists(id)
    && ormSession.WorkSession.withId(id),
);

export const selectedSubjectSelector = createOrmSelector(
  selectedSubjectIdSelector,
  (ormSession, selectedSubjectId) => selectedSubjectId !== -1
    && ormSession.Subject.withId(selectedSubjectId),
);
