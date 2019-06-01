import { createOrmSelector, ormSessionUnMemoized } from './orm';
import { sortByName } from '../../shared/utils';

export const subjectsSetSelector = state => ormSessionUnMemoized(state).Subject.all();

export const subjectsSelector = createOrmSelector(
  (state, props) => props && props.isArchive,
  (ormSession, isArchive) => sortByName(ormSession.Subject
    .all()
    .filter(subject => (isArchive && subject.archived)
                    || (!isArchive && !subject.archived))
    .toModelArray()),
);

export const subjectSelector = createOrmSelector(
  (_, props) => props.subjectId,
  (ormSession, id) => ormSession.Subject.withId(id),
);
