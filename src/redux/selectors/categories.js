import { createOrmSelector } from './orm';
import { sortByName } from '../../shared/utils';

export const categoriesSelector = createOrmSelector(
  (ormSession) => sortByName(ormSession.Category.all().toModelArray()),
);

export const categoriesByIdSelector = createOrmSelector(
  (ormSession) => {
    const categories = ormSession.Category.all().toModelArray();
    const categoriesById = {};
    categories.forEach((category) => {
      categoriesById[category.id] = category;
    });
    return categoriesById;
  },
);
