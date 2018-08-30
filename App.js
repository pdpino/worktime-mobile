import React from 'react';
import { Provider } from 'react-redux';
import RootContainer from './src/containers/Root';
import store from './src/redux/store';
import Notifications from './src/services/notifications';

class App extends React.Component {
  constructor(props) {
    super(props);

    Notifications.configure();
  }

  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
