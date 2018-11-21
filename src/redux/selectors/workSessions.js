import { createOrmSelector, ormSessionSelector } from './orm';

export const subjectSessionsSelector = createOrmSelector(
  ormSessionSelector,
  (_, props) => props.subjectId,
  (ormSession, id) => ormSession.Subject.withId(id)
    .worksessionSet.toModelArray()
    .sort((ws1, ws2) => ws2.timestampStart - ws1.timestampStart),
);

export const lastWorkSessionSelector = createOrmSelector(
  ormSessionSelector,
  ormSession => ormSession.WorkSession.all().last(),
);

export const workSessionsSelector = createOrmSelector(
  ormSessionSelector,
  ormSession => ormSession.WorkSession.all().toModelArray(),
);
