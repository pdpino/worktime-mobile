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
 *     data: [
 *       { id: '1', name: 'subj 1' },
 *       { id: '2', name: 'subj 2', description: 'do this and that' },
 *     ],
 *   },
 *   { name: 'other', data: [] },
 *   { name: 'Personal stuff', data: [{ id: '5', name: 'subj 5' }] },
 *   { name: 'No Category', data: [{ id: '6', name: 'subj 6' }] },
 * ];
 * Subjects returned are from the Subject Model, but categories are plain
 * objects.
 */
export const getCategoriesWithSubjects = memoizeOne((subjects, categories) => {
  const categoryToSubjects = {
    [Category.noCategoryId]: [],
  };

  if (categories) {
    categories.forEach((category) => {
      categoryToSubjects[category.id] = [];
    });
  }

  if (subjects) {
    subjects.forEach((subject) => {
      const categoryId = subject.category
        ? subject.category.id
        : Category.noCategoryId;
      const categoryList = categoryToSubjects[categoryId];
      if (!categoryList) {
        // (internal) error: a subject points to a non-existent category
        return;
      }
      categoryList.push(subject);
    });
  }

  const categoriesWithSubjects = (categories || []).map((category) => ({
    id: category.id,
    name: category.name,
    color: category.color,
    data: categoryToSubjects[category.id],
  }));

  const orphanSubjects = categoryToSubjects[Category.noCategoryId];
  if (orphanSubjects && orphanSubjects.length) {
    categoriesWithSubjects.push({
      id: Category.noCategoryId,
      name: i18n.t('entities.noCategory'),
      color: Category.noCategoryColor,
      data: orphanSubjects,
    });
  }

  // OPTIMIZE: do this more efficiently?
  return categoriesWithSubjects.sort((category1, category2) => {
    const length1 = category1.data.length;
    const length2 = category2.data.length;
    if (length1 === 0 && length2 > 0) {
      // cat2 goes first
      return 1;
    }
    if (length1 > 0 && length2 === 0) {
      // cat1 goes first
      return -1;
    }

    if (category1.id === -1) {
      // cat2 goes first ("No category" is last)
      return 1;
    }
    if (category2.id === -1) {
      // cat1 goes first ("No category" is last)
      return -1;
    }
    const name1 = category1.name.toLowerCase();
    const name2 = category2.name.toLowerCase();
    return name1 <= name2 ? -1 : 1;
  });
});

export const keepOnlyNonEmptyCategories = (
  categoriesWithSubjects,
) => categoriesWithSubjects.filter((cat) => cat.data.length > 0);
