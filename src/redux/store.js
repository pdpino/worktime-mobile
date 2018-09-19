import { createStore, applyMiddleware, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from 'redux-thunk';
import playerMiddleware from './middlewares/player';
import rootReducer from './reducers';

const configureStore = (persistCallback = () => {}) => {
  const config = {
    ...offlineConfig,
    persistCallback,
  };

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, playerMiddleware),
      offline(config),
    ),
  );

  return store;
};

export default configureStore;
