import { createSelector } from 'redux-orm';
import orm from '../models/orm';

const ormSessionSelector = state => state.entities;

// eslint-disable-next-line import/prefer-default-export
export const createOrmSelector = (...selectors) => createSelector(
  orm,
  ormSessionSelector,
  ...selectors,
);
