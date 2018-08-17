import { createOrmSelector, ormSessionSelector } from './orm';

// eslint-disable-next-line import/prefer-default-export
export const subjectsSelector = createOrmSelector(
  ormSessionSelector,
  ormSession => ormSession.Subject.all().toModelArray()
    .sort((subj1, subj2) => (subj1.name <= subj2.name ? -1 : 1)),
);
