import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileComponent from '../../components/settings/profile';
import { updateDeviceName } from '../../redux/actions';
import { profileSelector } from '../../redux/selectors';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const { deviceName } = props.profile || {};

    this.state = {
      deviceName,
    };

    this.handleChangeDeviceName = this.handleChangeDeviceName.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChangeDeviceName(value) {
    const deviceNameNoSpaces = value.replace(/\s/g, '');
    this.setState({ deviceName: deviceNameNoSpaces });
  }

  handleSave() {
    const { deviceName } = this.state;

    if (deviceName !== this.props.deviceName) {
      this.props.updateDeviceName(deviceName);
    }
    this.props.navigation.goBack();
  }

  render() {
    const { deviceName } = this.state;

    return (
      <ProfileComponent
        deviceName={deviceName}
        onChangeDeviceName={this.handleChangeDeviceName}
        onSubmit={this.handleSave}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: profileSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateDeviceName,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
