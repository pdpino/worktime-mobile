import React from 'react';
import { Provider } from 'react-redux';
import RootContainer from './src/screens/Root';
import configureStore from './src/redux/store';
import { SplashScreen } from './src/shared/UI/screens';
import AppStateListener from './src/services/appState';
import { onAppActivate, onAppDeactivate, checkStoreVersion } from './src/redux/actions';
import './src/shared/errors';

let store;
const storeVersionNeeded = 4;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storeReady: false,
    };

    store = configureStore(this.finishRehydrating.bind(this));
    this.appState = new AppStateListener();
  }

  componentDidMount() {
    this.appState.listenOnActivate(() => store.dispatch(onAppActivate()));
    this.appState.listenOnDeactivate(() => store.dispatch(onAppDeactivate()));
  }

  componentWillUnmount() {
    this.appState.removeListeners();
  }

  finishRehydrating() {
    store.dispatch(checkStoreVersion(storeVersionNeeded)).then(() => {
      this.setState({ storeReady: true });
      store.dispatch(onAppActivate()); // HACK
      // app activates before the rehydration,
      // so there is nothing in the store when the activation occurs
    });
  }

  render() {
    if (!this.state.storeReady) {
      return (
        <SplashScreen />
      );
    }

    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
