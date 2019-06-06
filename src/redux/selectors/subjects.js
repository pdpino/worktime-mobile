import { createOrmSelector, ormSessionUnMemoized } from './orm';
import { sortByName } from '../../shared/utils';

export const subjectsSetSelector = state => ormSessionUnMemoized(state).Subject.all();

export const subjectsSelector = createOrmSelector(
  (state, props) => props && props.archived,
  (ormSession, archived) => {
    const allSubjects = ormSession.Subject.all();
    const subjects = archived === 'all'
      ? allSubjects
      : allSubjects.filter(subject => (archived && subject.archived)
                                   || (!archived && !subject.archived));
    return sortByName(subjects.toModelArray());
  },
);

export const subjectSelector = createOrmSelector(
  (_, props) => props.subjectId,
  (ormSession, id) => ormSession.Subject.withId(id),
);
