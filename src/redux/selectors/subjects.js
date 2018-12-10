import { createOrmSelector, ormSessionUnMemoized } from './orm';

export const subjectsSetSelector = state => ormSessionUnMemoized(state).Subject.all();

export const subjectsSelector = createOrmSelector(
  ormSession => ormSession.Subject.all().toModelArray()
    .sort((subj1, subj2) => (subj1.name <= subj2.name ? -1 : 1)),
);

export const subjectSelector = createOrmSelector(
  (_, props) => props.subjectId,
  (ormSession, id) => ormSession.Subject.withId(id),
);
