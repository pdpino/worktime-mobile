import React from 'react';
import { Provider } from 'react-redux';
import RootContainer from './src/containers/Root';
import store from './src/redux/store';

const App = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
);

export default App;
