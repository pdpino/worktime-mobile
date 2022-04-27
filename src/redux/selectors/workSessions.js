import { createOrmSelector } from './orm';
import { isBetween } from '../../shared/dates';

export const lastWorkSessionSelector = createOrmSelector(
  (ormSession) => ormSession.WorkSession.all().last(),
);

export const workSessionsSelector = createOrmSelector(
  (ormSession) => ormSession.WorkSession.all().toModelArray(),
);

export const workSessionsSelectorByRange = createOrmSelector(
  (state, options) => options,
  (ormSession, options) => {
    const { startDate, endDate } = options;
    const filteredSessions = ormSession.WorkSession.all()
      .filter((workSession) => isBetween(
        startDate, endDate, ormSession.WorkSession.getLocalStartDate(workSession),
      ));
    return filteredSessions.toModelArray();
  },
);

export const workSessionsQuerySelector = createOrmSelector(
  (ormSession) => ormSession.WorkSession.all(),
);

export const workSessionsBySubjectSelector = createOrmSelector(
  (state, options) => options,
  (ormSession, options) => {
    const { subjectId, sorted = true } = options;
    const subject = ormSession.Subject.withId(subjectId);
    if (!subject) return [];
    let query = subject.worksessionSet;
    if (sorted) {
      query = query.orderBy(['timestampStart'], ['desc']);
    }
    return query.toModelArray();
  },
);

export const wsSetBySubjectSelector = createOrmSelector(
  (state, options) => options.subjectId,
  (ormSession, subjectId) => {
    const subject = ormSession.Subject.withId(subjectId);
    return subject ? subject.worksessionSet : null;
  },
);
