import { combineReducers } from 'redux';
import orm from '../models/orm';
import work from './work';
import entities from './entities';

const rootReducer = combineReducers({
  entities: entities(orm),
  work,
});

export default rootReducer;
