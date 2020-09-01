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

export const selectedSubjectAndCategorySelector = createOrmSelector(
  selectedSubjectIdSelector,
  (ormSession, selectedSubjectId) => {
    if (selectedSubjectId === -1) {
      return null;
    }
    const subject = ormSession.Subject.withId(selectedSubjectId);
    if (!subject) {
      return null;
    }
    const category = subject.category && ormSession.Category.withId(subject.category.id);
    return {
      subject,
      category,
    };
  },
);
