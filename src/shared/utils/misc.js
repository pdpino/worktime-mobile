import unorm from 'unorm';
import memoizeOne from 'memoize-one';

export function smartDivision(divide, by, percentage = false, decimals = 1) {
  const perc = percentage ? 100 : 1;
  return by !== 0 ? (divide / by * perc).toFixed(decimals) : 0;
}

export function prettyPercentage(value, divider) {
  const percentage = divider ? smartDivision(value, divider, true, 0) : value.toFixed(0);
  return `${percentage}%`;
}

export function toMaxFixed(number, decimals) {
  const roundedNumber = number.toFixed(decimals);
  const hasDecimals = roundedNumber % 1 === 0;
  const numberStr = hasDecimals ? roundedNumber : number.toFixed(0);
  return parseFloat(numberStr);
}

export function makeFunctionAsync(func) {
  // REVIEW: usage of setTimeout to make something async, is it too hacky?
  return (...params) => new Promise((resolve) => {
    setTimeout(() => resolve(func(...params)), 0);
  });
}

export function extractFilename(filePath) {
  const splitted = filePath.split('/');
  return splitted[splitted.length - 1];
}

export const sortByName = memoizeOne((array) => {
  const getName = elem => (elem && elem.name && elem.name.toLowerCase()) || '';
  return array.sort(
    (elem1, elem2) => (getName(elem1) <= getName(elem2) ? -1 : 1),
  );
});

export function removeStrAccents(str) {
  return unorm.nfd(str).replace(/[\u0300-\u036f]/g, '');
}

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
export const getSubjectsAsSectionList = memoizeOne((subjects, categories) => {
  const noCategoryId = -1;

  const categoryToSubjects = {
    [noCategoryId]: [],
  };

  categories.forEach((category) => {
    categoryToSubjects[category.id] = [];
  });

  subjects.forEach((subject) => {
    const categoryId = subject.category ? subject.category.id : noCategoryId;
    categoryToSubjects[categoryId].push(subject);
  });

  const subjectsByCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    data: categoryToSubjects[category.id],
  }));

  const orphanSubjects = categoryToSubjects[noCategoryId];
  if (orphanSubjects && orphanSubjects.length) {
    subjectsByCategories.push({
      id: noCategoryId,
      name: 'No Category', // DICTIONARY
      data: orphanSubjects,
    });
  }

  // OPTIMIZE: do this more efficiently?
  return subjectsByCategories.sort((category1, category2) => {
    const length1 = category1.data.length;
    const length2 = category2.data.length;
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
