import React from 'react';
import { Provider } from 'react-redux';
import RootContainer from './src/screens/Root';
import configureStore from './src/redux/store';
import { SplashScreen } from './src/shared/UI/screens';
import AppStateListener from './src/services/appState';
import { onAppActivate, onAppDeactivate } from './src/redux/actions';

let store;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRehydrated: false,
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
    this.setState({ isRehydrated: true });
    store.dispatch(onAppActivate());
  }

  render() {
    if (!this.state.isRehydrated) {
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
