import { createOrmSelector, ormSessionUnMemoized } from './orm';
import { sortByName } from '../../shared/utils';

export const subjectsSetSelector = state => ormSessionUnMemoized(state).Subject.all();

export const subjectsSelector = createOrmSelector(
  ormSession => sortByName(ormSession.Subject.all().toModelArray()),
);

export const subjectSelector = createOrmSelector(
  (_, props) => props.subjectId,
  (ormSession, id) => ormSession.Subject.withId(id),
);
