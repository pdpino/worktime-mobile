import React from 'react';
import { Provider } from 'react-redux';
import RootContainer from './src/screens/Root';
import configureStore from './src/redux/store';
import { SplashScreen } from './src/shared/UI/screens';

let store;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRehydrated: false,
    };

    store = configureStore(this.finishRehydrating.bind(this));
  }

  finishRehydrating() {
    this.setState({ isRehydrated: true });
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
