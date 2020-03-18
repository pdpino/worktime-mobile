import React from 'react';
import { connect } from 'react-redux';
import WeekViewComponent, { NDaysPicker } from '../../components/week';
import { workSessionsSelector } from '../../redux/selectors';
import { getToday } from '../../shared/dates';
import { HeaderActions } from '../../shared/UI/headers';
import i18n from '../../shared/i18n';

export class WeekView extends React.Component {
  static navigationOptions({ navigation }) {
    const actions = [
      {
        icon: 'columns',
        handlePress: navigation.getParam('handlePressNDaysMenu'),
      },
    ];

    return {
      title: i18n.t('week'),
      headerRight: <HeaderActions actions={actions} />,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      nDays: 3,
      nDaysMenuVisible: false,
      selectedDate: getToday(),
    };

    this.handlePressNDaysMenu = this.handlePressNDaysMenu.bind(this);
    this.handleChangeNDays = this.handleChangeNDays.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.props.navigation.setParams({
      handlePressNDaysMenu: this.handlePressNDaysMenu,
    });
  }

  handlePressNDaysMenu() {
    this.setState(state => ({
      nDaysMenuVisible: !state.nDaysMenuVisible,
    }));
  }

  handleChangeNDays(nDays) {
    this.setState({
      nDays,
    });
  }

  closeModal() {
    this.setState({
      nDaysMenuVisible: false,
    });
  }

  render() {
    const { workSessions } = this.props;
    const {
      nDays, nDaysMenuVisible, selectedDate,
    } = this.state;

    return (
      <WeekViewComponent
        workSessions={workSessions}
        nDays={nDays}
        selectedDate={selectedDate}
      >
        <NDaysPicker
          isVisible={nDaysMenuVisible}
          onValueChange={this.handleChangeNDays}
          closeModal={this.closeModal}
        />
      </WeekViewComponent>
    );
  }
}

const mapStateToProps = state => ({
  workSessions: workSessionsSelector(state),
});

export default connect(mapStateToProps)(WeekView);
