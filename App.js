import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import RootContainer from './src/screens/Root';
import configureStore from './src/redux/store';
import { SplashScreen } from './src/shared/UI/screens';
import AppStateListener from './src/services/appState';
import NotificationsService from './src/services/notifications';
import { onAppActivate, onAppDeactivate, checkStoreVersion } from './src/redux/actions';
import I18N from './src/shared/i18n';
import './src/shared/errors';

let store;
const storeVersionNeeded = 5;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storeReady: false,
    };

    store = configureStore(this.finishRehydrating);
    this.appState = new AppStateListener();
    I18N.setup();
  }

  componentDidMount() {
    this.appState.listenOnActivate(() => store.dispatch(onAppActivate()));
    this.appState.listenOnDeactivate(() => store.dispatch(onAppDeactivate()));

    NotificationsService.listenForegroundEvents();
  }

  componentWillUnmount() {
    this.appState.removeListeners();
    I18N.removeListeners();
    NotificationsService.removeListeners();
  }

  finishRehydrating = () => {
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
