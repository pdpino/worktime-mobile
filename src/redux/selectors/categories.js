import { createOrmSelector } from './orm';
import { sortByName } from '../../shared/utils';

export const categoriesSelector = createOrmSelector(
  (ormSession) => sortByName(ormSession.Category.all().toModelArray()),
);

export const categorySelector = createOrmSelector(
  (state, props) => props.categoryId,
  (ormSession, id) => ormSession.Category.withId(id),
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
