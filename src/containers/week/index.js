import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { sortEventsByDate } from 'react-native-week-view/src/utils';
import WeekViewComponent from '../../components/week';
import NDaysPicker from '../../components/week/nDaysPicker';
import { Memoizer } from '../../shared/utils';
import { workSessionsSelector } from '../../redux/selectors';
import {
  getToday, prettyHour, prettyDate, prettyTimespanDuration,
} from '../../shared/dates';
import { HeaderActions } from '../../shared/UI/headers';
import i18n from '../../shared/i18n';
import { getLightColor } from '../../shared/styles';

export class WeekView extends React.Component {
  static navigationOptions({ navigation }) {
    const actions = [
      {
        icon: 'today',
        handlePress: navigation.getParam('handlePressGoToToday'),
      },
      {
        icon: 'columns',
        handlePress: navigation.getParam('handlePressNDaysMenu'),
      },
    ];

    return {
      title: i18n.t('week'),
      headerRight: () => <HeaderActions actions={actions} />,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      nDays: 7,
      nDaysMenuVisible: false,
      selectedDate: getToday(),
      workSessionsByDate: {},
      isProcessing: true,
    };
    // NOTE: the selectedDate value won't be updated with the current selectedDate,
    // as the event handlers from react-native-week-view are not connected.
    // If they were connected (onSwipePrev/Next), on each call, a setState() should
    // be called, which would trigger an un-necessary re-render.

    this.handlePressNDaysMenu = this.handlePressNDaysMenu.bind(this);
    this.handleChangeNDays = this.handleChangeNDays.bind(this);
    this.handlePressGoToToday = this.handlePressGoToToday.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.processWorkSessions = this.processWorkSessions.bind(this);
    this.handlePressEvent = this.handlePressEvent.bind(this);

    this.props.navigation.setParams({
      handlePressNDaysMenu: this.handlePressNDaysMenu,
      handlePressGoToToday: this.handlePressGoToToday,
    });

    this.memoizer = Memoizer();
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => this.processWorkSessions(),
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  componentWillUnmount() {
    if (this.didFocusListener) this.didFocusListener.remove();
  }

  handlePressNDaysMenu() {
    this.setState((state) => ({
      nDaysMenuVisible: !state.nDaysMenuVisible,
    }));
  }

  handleChangeNDays(nDays) {
    this.setState({
      nDays,
      nDaysMenuVisible: false,
    });
  }

  handlePressGoToToday() {
    this.setState({
      selectedDate: getToday(),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handlePressEvent(event) {
    const day = prettyDate(event.startDate);
    const startHour = prettyHour(event.startDate);
    const endHour = prettyHour(event.endDate);
    const duration = prettyTimespanDuration(event.startDate, event.endDate);
    Alert.alert(
      event.description,
      `${day}\n${startHour} - ${endHour}\n${duration}`,
    );
  }

  closeModal() {
    this.setState({
      nDaysMenuVisible: false,
    });
  }

  processWorkSessions() {
    const { workSessions } = this.props;

    if (!this.memoizer.hasChanged(workSessions)) {
      this.setState({
        isProcessing: false,
      });
      return;
    }

    this.setState({
      isProcessing: true,
    });

    requestAnimationFrame(() => {
      const events = workSessions.map((workSession) => {
        const { subject } = workSession;
        const { category } = subject;
        const color = category ? category.color : 'gray'; // HACK: default hardcoded
        return {
          id: workSession.id,
          description: subject.name,
          startDate: workSession.getLocalStartDate(),
          endDate: workSession.getLocalEndDate(),
          color: getLightColor(color),
          icon: subject.icon,
        };
      });
      this.setState({
        workSessionsByDate: sortEventsByDate(events),
        isProcessing: false,
      });
    });
  }

  render() {
    const {
      nDays, nDaysMenuVisible, selectedDate, workSessionsByDate, isProcessing,
    } = this.state;

    return (
      <WeekViewComponent
        workSessions={workSessionsByDate}
        nDays={nDays}
        selectedDate={selectedDate}
        isProcessing={isProcessing}
        onPressEvent={this.handlePressEvent}
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

const mapStateToProps = (state) => ({
  workSessions: workSessionsSelector(state),
});

export default connect(mapStateToProps)(WeekView);
