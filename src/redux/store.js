import { createStore } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  offline(offlineConfig),
);

export default store;
