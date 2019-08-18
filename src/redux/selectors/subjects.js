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

export const subjectsForPickerSelector = createOrmSelector(
  subjectsSelector,
  (ormSession, subjects) => {
    const getSubjectNameWithCategory = (subject) => {
      // FIXME: this function is replicated in models/subject.js,
      // to be used in TimeStats when calculating SubjectSummaries.
      // The function here is the correct way, any access should be done from
      // inside the selectors. See:
      // https://github.com/redux-orm/redux-orm/issues/218#issuecomment-402448424
      // In this specific case, this is done this way so whenever the subjects
      // are retrieved, the category's names/aliases are updated.
      if (subject.category) {
        const category = ormSession.Category.withId(subject.category.id);
        return `${category.getShortName()} - ${subject.name}`;
      }
      return subject.name;
    };

    return subjects.map(subject => ({
      id: subject.id,
      name: getSubjectNameWithCategory(subject),
      hasCategory: !!subject.category,
    })).sort((subj1, subj2) => {
      if (subj1.hasCategory && !subj2.hasCategory) {
        // Subjects with category go to the top (subj1)
        return -1;
      }
      if (!subj1.hasCategory && subj2.hasCategory) {
        // Subjects without category go to the bottom (subj1)
        return 1;
      }
      const name1 = subj1.name ? subj1.name.toLowerCase() : '';
      const name2 = subj2.name ? subj2.name.toLowerCase() : '';

      return name1 <= name2 ? -1 : 1;
    });
  },
);
