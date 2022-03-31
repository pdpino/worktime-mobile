import React from 'react';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native';
import share from '../../services/sharing';
import { subjectsSetSelector, profileSelector } from '../../redux/selectors';
import ExportingComponent from '../../components/settings/exporting';
import { getExportableObject, getExportFilename } from '../../shared/porting';
import { getTimestampString } from '../../shared/dates';

export class Exporting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPreparingData: false,
    };
  }

  handlePressExport = () => {
    const device = this.props.profile.deviceName;
    const filename = getExportFilename(device);

    this.setState(
      { isPreparingData: true },
      () => InteractionManager.runAfterInteractions(() => {
        getExportableObject({
          timestamp: getTimestampString(),
          device,
          subjectsSet: this.props.subjectsSet,
        }).then((exportObject) => share(filename, exportObject))
          .finally(() => this.setState({ isPreparingData: false }));
      }),
    );
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

const mapStateToProps = (state) => ({
  subjectsSet: subjectsSetSelector(state),
  profile: profileSelector(state),
});

export default connect(mapStateToProps)(Exporting);
