import { createOrmSelector, ormSessionUnMemoized } from './orm';

const getSubjName = (elem) => (
  elem && elem.name && elem.name.toLowerCase && elem.name.toLowerCase())
  || '';

export const subjectsSetSelector = (state) => ormSessionUnMemoized(state).Subject.all();

export const subjectsSelector = createOrmSelector(
  (state, props) => props && props.archived,
  (ormSession, archived) => {
    let query = ormSession.Subject.all();
    if (archived !== 'all') {
      query = query.filter(
        (subject) => (archived && subject.archived) || (!archived && !subject.archived),
      );
    }
    return query.orderBy(getSubjName).toModelArray();
  },
);

export const subjectsByIdSelector = createOrmSelector(
  (ormSession) => {
    const subjects = ormSession.Subject.all().toModelArray();
    const subjectsById = {};
    subjects.forEach((subject) => {
      subjectsById[subject.id] = subject;
    });
    return subjectsById;
  },
);

export const subjectsSliceSelector = createOrmSelector(
  (state, props) => props.ids,
  (ormSession, ids) => {
    const isSelected = new Set(ids);
    return ormSession.Subject.all().filter(
      (subj) => isSelected.has(subj.id),
    ).orderBy(getSubjName).toModelArray();
  },
);

export const subjectSelector = createOrmSelector(
  (_, props) => props.subjectId,
  (ormSession, id) => ormSession.Subject.withId(id),
);

export const subjectWithCategoryInfoSelector = createOrmSelector(
  (_, props) => props.subjectId,
  (ormSession, id) => {
    const subject = ormSession.Subject.withId(id);
    if (!subject) return null;
    let color = null;
    let categoryName = null;
    let categoryId = -1;
    if (subject.category) {
      color = subject.category.color;
      categoryName = subject.category.name;
      categoryId = subject.category.id;
    }
    const info = {
      id: subject.id,
      name: subject.name,
      icon: subject.icon,
      description: subject.description,
      color,
      categoryName,
      categoryId,
    };
    return info;
  },
);

export const subjectsForPickerSelector = createOrmSelector(
  subjectsSelector,
  (ormSession, subjects) => {
    const getSubjectNameWithCategory = (subject) => {
      const category = ormSession.Category.withId(subject.getCategoryId());
      return subject.getNameWithCategory(category);
    };

    return subjects.map((subject) => ({
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
