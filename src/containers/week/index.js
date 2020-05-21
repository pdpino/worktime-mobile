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
      nDays: 7,
      nDaysMenuVisible: false,
      selectedDate: getToday(),
    };

    this.handlePressNDaysMenu = this.handlePressNDaysMenu.bind(this);
    this.handleChangeNDays = this.handleChangeNDays.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.forceReloadIfChanged = this.forceReloadIfChanged.bind(this);

    this.props.navigation.setParams({
      handlePressNDaysMenu: this.handlePressNDaysMenu,
    });

    this.workSessionsChanged = false;
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      this.forceReloadIfChanged,
    );
  }

  shouldComponentUpdate(nextProps) {
    // NOTE/HACK: the (forceReloadIfChanged + workSessionsChanged +
    // shouldComponentUpdate) logic is done to avoid heavy renders when the tab
    // is not focused. Rendering of children is heavy. When the user is at
    // another tab and modifies workSessions (e.g. play/pause/stop, delete
    // workSession) a re-render of said children will be triggered, causing a
    // lot of latency. To fix this, shouldComponentUpdate indicates to update
    // only when the tab is focused. However, this implies that when the tab is
    // focused again, the workSessions prop will be outdated (it wasn't updated
    // when shouldComponentUpdate returned false!). Hence, a forceUpdate is
    // called on willFocus, but only if the workSessions prop actually changed.
    const { workSessions } = this.props;
    this.workSessionsChanged = workSessions !== nextProps.workSessions;
    return nextProps.navigation.isFocused();
  }

  componentWillUnmount() {
    if (this.willFocusListener) this.willFocusListener.remove();
  }

  forceReloadIfChanged() {
    if (this.workSessionsChanged) {
      this.workSessionsChanged = false;
      this.forceUpdate();
    }
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
