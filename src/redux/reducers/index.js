import { combineReducers } from 'redux';
import orm from '../models/orm';
import work from './work';
import app from './app';
import entities from './entities';
import porting from './porting';

const rootReducer = combineReducers({
  entities: entities(orm),
  work,
  app,
  porting,
});

export default rootReducer;
