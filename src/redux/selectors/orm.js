import { createSelector } from 'redux-orm';
import orm from '../models/orm';

export const ormSessionUnMemoized = state => orm.session(state.entities);

export const createOrmSelector = (...selectors) => createSelector(
  orm,
  state => state.entities,
  ...selectors,
);
