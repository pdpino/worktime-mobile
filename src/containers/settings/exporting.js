import React from 'react';
import { connect } from 'react-redux';
import share from '../../services/sharing';
import { subjectsSetSelector, profileSelector } from '../../redux/selectors';
import ExportingComponent from '../../components/settings/exporting';
import { getExportableObject, getExportFilename } from '../../shared/porting';
import { getTimestampString } from '../../shared/utils';

class Exporting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPreparingData: false,
    };

    this.handlePressExport = this.handlePressExport.bind(this);
  }

  handlePressExport() {
    const device = this.props.profile.deviceName;
    const filename = getExportFilename(device);

    this.setState({ isPreparingData: true }, () => {
      getExportableObject({
        timestamp: getTimestampString(),
        device,
        subjectsSet: this.props.subjectsSet,
      }).then(exportObject => share(filename, exportObject))
        .then(() => this.setState({ isPreparingData: false }));
    });
  }

  render() {
    const { isPreparingData } = this.state;

    return (
      <ExportingComponent
        isPreparingData={isPreparingData}
        onPressExport={this.handlePressExport}
      />
    );
  }
}

const mapStateToProps = state => ({
  subjectsSet: subjectsSetSelector(state),
  profile: profileSelector(state),
});

export default connect(mapStateToProps)(Exporting);
