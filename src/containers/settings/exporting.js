import React from 'react';
import ExportingComponent from '../../components/settings/exporting';

class Exporting extends React.Component {
  constructor(props) {
    super(props);

    this.handlePressShare = this.handlePressShare.bind(this);
  }

  handlePressShare() {
    console.log('SHARING');
  }

  render() {
    return (
      <ExportingComponent
        onPressShare={this.handlePressShare}
      />
    );
  }
}

export default Exporting;
