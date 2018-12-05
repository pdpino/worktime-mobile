import { combineReducers } from 'redux';
import orm from '../models/orm';
import work from './work';
import app from './app';
import entities from './entities';

const rootReducer = combineReducers({
  entities: entities(orm),
  work,
  app,
});

export default rootReducer;
