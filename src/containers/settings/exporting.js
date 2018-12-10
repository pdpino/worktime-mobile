import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import share from '../../services/sharing';
import { subjectsSetSelector, lastExportedSelector } from '../../redux/selectors';
import { updateExportTimestamp } from '../../redux/actions';
import ExportingComponent from '../../components/settings/exporting';
import { exportSubjects } from '../../shared/porting';

class Exporting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptionKey: 'lastExported',
    };

    this.handlePressShare = this.handlePressShare.bind(this);
    this.handlePressOption = this.handlePressOption.bind(this);
    this.handlePressUpdateTimestamp = this.handlePressUpdateTimestamp.bind(this);

    this.options = [
      {
        key: 'everything',
      },
      {
        key: 'lastExported',
      },
    ];
  }

  handlePressOption(selectedOptionKey) {
    this.setState({
      selectedOptionKey,
    });
  }

  handlePressShare() {
    const { lastExportedTimestamp } = this.props;
    const { selectedOptionKey } = this.state;
    const options = {
      since: selectedOptionKey === 'lastExported'
        ? lastExportedTimestamp : null,
    };
    const exportable = exportSubjects(this.props.subjectsSet, options);

    share('subjects', exportable);
  }

  handlePressUpdateTimestamp() {
    // DICTIONARY
    Alert.alert(
      'Confirmation',
      'Are you sure you want to mark now as last exported?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => this.props.updateExportTimestamp() },
      ],
    );
  }

  render() {
    const { lastExportedTimestamp } = this.props;
    const { selectedOptionKey } = this.state;

    return (
      <ExportingComponent
        lastExportedTimestamp={lastExportedTimestamp}
        options={this.options}
        selectedOptionKey={selectedOptionKey}
        onPressOption={this.handlePressOption}
        onPressShare={this.handlePressShare}
        onPressUpdateTimestamp={this.handlePressUpdateTimestamp}
      />
    );
  }
}

const mapStateToProps = state => ({
  subjectsSet: subjectsSetSelector(state),
  lastExportedTimestamp: lastExportedSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateExportTimestamp,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Exporting);
