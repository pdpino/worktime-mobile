import { combineReducers } from 'redux';
import orm from '../models/orm';
import app from './app';
import entities from './entities';
import profile from './profile';
import work from './work';

const rootReducer = combineReducers({
  entities: entities(orm),
  work,
  app,
  profile,
});

export default rootReducer;
