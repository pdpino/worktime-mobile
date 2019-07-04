import { createOrmSelector } from './orm';
import { sortByName } from '../../shared/utils';

// eslint-disable-next-line import/prefer-default-export
export const categoriesSelector = createOrmSelector(
  ormSession => sortByName(ormSession.Category.all().toModelArray()),
);
