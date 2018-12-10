import React from 'react';
import { connect } from 'react-redux';
import share from '../../services/sharing';
import { subjectsSetSelector } from '../../redux/selectors';
import ExportingComponent from '../../components/settings/exporting';
import { exportSubjects } from '../../shared/porting';

class Exporting extends React.Component {
  constructor(props) {
    super(props);

    this.handlePressShare = this.handlePressShare.bind(this);
  }

  handlePressShare() {
    const exportable = exportSubjects(this.props.subjectsSet);
    share('subjects', exportable);
  }

  render() {
    return (
      <ExportingComponent
        onPressShare={this.handlePressShare}
      />
    );
  }
}

const mapStateToProps = state => ({
  subjectsSet: subjectsSetSelector(state),
});

export default connect(mapStateToProps)(Exporting);
