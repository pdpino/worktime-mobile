import React from 'react';
import { InteractionManager } from 'react-native';
import { SplashScreen } from '../shared/UI/screens';

export default function afterInteractions(Component) {
  class AfterInteractions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        finished: false,
      };
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.setState({ finished: true });
      });
    }

    render() {
      if (!this.state.finished) {
        return <SplashScreen />;
      }

      return (
        <Component {...this.props} />
      );
    }
  }

  return AfterInteractions;
}
