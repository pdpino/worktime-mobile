import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { sortEventsByDate } from 'react-native-week-view/src/utils';
import WeekViewComponent from '../../components/week';
import NDaysPicker from '../../components/week/nDaysPicker';
import { Memoizer } from '../../shared/utils';
import {
  workSessionsSelector, subjectsByIdSelector, categoriesByIdSelector,
} from '../../redux/selectors';
import {
  getToday, prettyHour, prettyDate, prettyTimespanDuration,
} from '../../shared/dates';
import { HeaderActions } from '../../shared/UI/headers';
import { getLightColor } from '../../shared/styles';

export class WeekView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nDays: 7,
      nDaysMenuVisible: false,
      workSessionsByDate: {},
      isProcessing: true,
    };

    this.today = getToday();

    this.memoizer = Memoizer();
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      () => this.processWorkSessions(),
    );

    const actions = [
      {
        icon: 'today',
        handlePress: this.handlePressGoToToday,
      },
      {
        icon: 'columns',
        handlePress: this.handlePressNDaysMenu,
      },
    ];

    this.props.navigation.setOptions({
      headerRight: () => <HeaderActions actions={actions} />,
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  componentWillUnmount() {
    if (this.focusListener) this.focusListener();
  }

  handlePressNDaysMenu = () => {
    this.setState((state) => ({
      nDaysMenuVisible: !state.nDaysMenuVisible,
    }));
  }

  handleChangeNDays = (nDays) => {
    this.setState({
      nDays,
      nDaysMenuVisible: false,
    });
  }

  handlePressGoToToday = () => {
    if (this.weekViewRef) {
      this.weekViewRef.goToDate(getToday());
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handlePressEvent = (event) => {
    const day = prettyDate(event.startDate);
    const startHour = prettyHour(event.startDate);
    const endHour = prettyHour(event.endDate);
    const duration = prettyTimespanDuration(event.startDate, event.endDate);
    Alert.alert(
      event.description,
      `${day}\n${startHour} - ${endHour}\n${duration}`,
    );
  }

  closeModal = () => {
    this.setState({
      nDaysMenuVisible: false,
    });
  }

  processWorkSessions = () => {
    const {
      workSessions, subjectsById, categoriesById,
    } = this.props;

    if (!this.memoizer.hasChanged(workSessions, subjectsById, categoriesById)) {
      this.setState({
        isProcessing: false,
      });
      return;
    }

    // HACK: not working properly with runAfterInteractions,
    // working with setTimeout(..., 0) for now.
    this.setState(
      { isProcessing: true },
      () => setTimeout(() => {
        const events = workSessions.map((workSession) => {
          const subject = subjectsById[workSession.subject.id];
          const category = subject.category && categoriesById[subject.category.id];
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
      }, 0),
    );
  }

  saveWeekRef = (ref) => {
    this.weekViewRef = ref;
  }

  render() {
    const {
      nDays, nDaysMenuVisible, workSessionsByDate, isProcessing,
    } = this.state;

    return (
      <WeekViewComponent
        workSessions={workSessionsByDate}
        nDays={nDays}
        selectedDate={this.today}
        isProcessing={isProcessing}
        onPressEvent={this.handlePressEvent}
        ref={this.saveWeekRef}
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
  subjectsById: subjectsByIdSelector(state),
  categoriesById: categoriesByIdSelector(state),
});

export default connect(mapStateToProps)(WeekView);
