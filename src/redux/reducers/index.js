import { combineReducers } from 'redux';
import orm from '../models/orm';
import working from './working';
import entities from './entities';

const rootReducer = combineReducers({
  orm: entities(orm),
  working,
});

export default rootReducer;
