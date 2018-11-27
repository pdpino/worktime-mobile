import { createOrmSelector, ormSessionSelector } from './orm';

export const lastWorkSessionSelector = createOrmSelector(
  ormSessionSelector,
  ormSession => ormSession.WorkSession.all().last(),
);

export const workSessionsSelector = createOrmSelector(
  ormSessionSelector,
  ormSession => ormSession.WorkSession.all().toModelArray(),
);
