import memoizeOne from 'memoize-one';
import Category from '../../redux/models/Category';
import i18n from '../i18n';

/* eslint-disable import/prefer-default-export */

/**
 * Returns subjects formatted as a SectionList, organizing by category.
 *
 * Receives Model objects.
 * Result example:
 * [
 *   {
 *     name: 'Work',
 *     subjects: [
 *       { id: '1', name: 'subj 1' },
 *       { id: '2', name: 'subj 2', description: 'do this and that' },
 *     ],
 *   },
 *   { name: 'other', subjects: [] },
 *   { name: 'Personal stuff', subjects: [{ id: '5', name: 'subj 5' }] },
 *   { name: 'No Category', subjects: [{ id: '6', name: 'subj 6' }] },
 * ];
 * Subjects returned are from the Subject Model, but categories are plain
 * objects.
 */
export const getCategoriesWithSubjects = memoizeOne((subjects, categories) => {
  const categoryToSubjects = {
    [Category.noCategoryId]: [],
  };

  categories.forEach((category) => {
    categoryToSubjects[category.id] = [];
  });

  subjects.forEach((subject) => {
    const categoryId = subject.category
      ? subject.category.id
      : Category.noCategoryId;
    categoryToSubjects[categoryId].push(subject);
  });

  const categoriesWithSubjects = categories.map((category) => ({
    id: category.id,
    name: category.name,
    color: category.color,
    subjects: categoryToSubjects[category.id],
  }));

  const orphanSubjects = categoryToSubjects[Category.noCategoryId];
  if (orphanSubjects && orphanSubjects.length) {
    categoriesWithSubjects.push({
      id: Category.noCategoryId,
      name: i18n.t('entities.noCategory'),
      color: Category.noCategoryColor,
      subjects: orphanSubjects,
    });
  }

  // OPTIMIZE: do this more efficiently?
  return categoriesWithSubjects.sort((category1, category2) => {
    const length1 = category1.subjects.length;
    const length2 = category2.subjects.length;
    if (length1 === 0 && length2 > 0) {
      // 2 goes first
      return 1;
    }
    if (length1 > 0 && length2 === 0) {
      // 1 goes first
      return -1;
    }

    if (category1.id === -1) {
      // 2 goes first ("No category" is last)
      return 1;
    }
    if (category2.id === -1) {
      // 1 goes first ("No category" is last)
      return -1;
    }
    const name1 = category1.name.toLowerCase();
    const name2 = category2.name.toLowerCase();
    return name1 <= name2 ? -1 : 1;
  });
});
