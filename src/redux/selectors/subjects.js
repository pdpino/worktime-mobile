import { createSelector } from 'redux-orm';
import orm from '../models/orm';
import ormSessionSelector from './orm';

const subjectsSelector = createSelector(
  orm,
  ormSessionSelector,
  session => session.Subject.all().toModelArray(),
);

export default subjectsSelector;
