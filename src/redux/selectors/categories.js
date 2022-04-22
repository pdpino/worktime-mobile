import { createOrmSelector } from './orm';

const getCategoryName = (elem) => (
  elem && elem.name && elem.name.toLowerCase && elem.name.toLowerCase())
  || '';

export const categoriesSelector = createOrmSelector(
  (ormSession) => ormSession.Category.all().orderBy(getCategoryName).toModelArray(),
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
