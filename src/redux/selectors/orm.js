import { createSelector } from 'redux-orm';
import orm from '../models/orm';

export const ormSessionSelector = state => state.entities;

export const createOrmSelector = (...selectors) => createSelector(
  orm,
  ...selectors,
);
