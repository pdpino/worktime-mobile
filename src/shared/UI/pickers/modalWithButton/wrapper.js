import React from 'react';

export default function asOnlyVisible(Component) {
  class AsOnlyVisible extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.isVisible;
    }

    render() {
      return <Component {...this.props} />;
    }
  }
  return AsOnlyVisible;
}
