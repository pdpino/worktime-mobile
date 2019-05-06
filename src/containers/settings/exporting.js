import React from 'react';
import { connect } from 'react-redux';
import share from '../../services/sharing';
import { subjectsSetSelector } from '../../redux/selectors';
import ExportingComponent from '../../components/settings/exporting';
import { getExportableObject, getExportFilename } from '../../shared/porting';
import { getTimestampString } from '../../shared/utils';

class Exporting extends React.Component {
  constructor(props) {
    super(props);

    this.handlePressExport = this.handlePressExport.bind(this);
  }

  handlePressExport() {
    const device = 'mobile';

    const exportObject = getExportableObject({
      timestamp: getTimestampString(),
      device,
      subjectsSet: this.props.subjectsSet,
    });

    const filename = getExportFilename(device);
    share(filename, exportObject);
  }

  render() {
    return (
      <ExportingComponent
        onPressExport={this.handlePressExport}
      />
    );
  }
}

const mapStateToProps = state => ({
  subjectsSet: subjectsSetSelector(state),
});

export default connect(mapStateToProps)(Exporting);
