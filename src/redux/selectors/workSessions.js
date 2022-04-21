import { createOrmSelector } from './orm';
import { isBetween } from '../../shared/dates';

export const lastWorkSessionSelector = createOrmSelector(
  (ormSession) => ormSession.WorkSession.all().last(),
);

export const workSessionsSelector = createOrmSelector(
  (ormSession) => ormSession.WorkSession.all().toModelArray(),
);

export const workSessionsSelectorByRange = createOrmSelector(
  (state, params) => params,
  (ormSession, params) => {
    const { startDate, endDate } = params;
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
