import { AppState } from 'react-native';

class AppStateListener {
  constructor() {
    this.listenOnActivate(() => {});
    this.listenOnDeactivate(() => {});

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  listenOnActivate = (callback) => {
    this.onActivate = callback;
  }

  listenOnDeactivate = (callback) => {
    this.onDeactivate = callback;
  }

  removeListeners = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.appState === 'active') {
      this.onDeactivate();
    } else if (nextAppState === 'active') {
      this.onActivate();
    }
    this.appState = nextAppState;
  }
}

export default AppStateListener;
