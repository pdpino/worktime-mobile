import { createOrmSelector, ormSessionSelector } from './orm';

const runningSessionIdSelector = state => state.work.runningSessionId;
const selectedSubjectIdSelector = state => state.work.selectedSubjectId;

export const runningSessionSelector = createOrmSelector(
  ormSessionSelector,
  runningSessionIdSelector,
  (ormSession, runningSessionId) => runningSessionId !== -1
    && ormSession.WorkSession.withId(runningSessionId),
);

export const selectedSubjectSelector = createOrmSelector(
  ormSessionSelector,
  selectedSubjectIdSelector,
  (ormSession, selectedSubjectId) => selectedSubjectId !== -1
    && ormSession.Subject.withId(selectedSubjectId),
);
