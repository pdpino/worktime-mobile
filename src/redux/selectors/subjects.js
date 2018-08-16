import { createOrmSelector, ormSessionSelector } from './orm';

// eslint-disable-next-line import/prefer-default-export
export const subjectsSelector = createOrmSelector(
  ormSessionSelector,
  ormSession => ormSession.Subject.all().toModelArray(),
);
