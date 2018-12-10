import { createOrmSelector } from './orm';

export const lastWorkSessionSelector = createOrmSelector(
  ormSession => ormSession.WorkSession.all().last(),
);

export const workSessionsSelector = createOrmSelector(
  ormSession => ormSession.WorkSession.all().toModelArray(),
);
