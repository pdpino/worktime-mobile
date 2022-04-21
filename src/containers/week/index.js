import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { bucketEventsByDate } from 'react-native-week-view/src/utils';
import { differenceInWeeks } from 'date-fns';
import {
  WeekViewComponent, Week, NDaysPicker,
} from '../../components/week';
import { Memoizer } from '../../shared/utils';
import {
  workSessionsQuerySelector, subjectsByIdSelector, categoriesByIdSelector,
} from '../../redux/selectors';
import {
  getToday, prettyHour, prettyDate, prettyDuration, getTimestamp,
  getNWeeksBefore,
} from '../../shared/dates';
import { HeaderActions } from '../../shared/UI/headers';
import { getLightColor } from '../../shared/styles';

const WEEKS_BUFFER = {
  size: 4,
  threshold: 2,
};

export class WeekView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nDays: 7,
      nDaysMenuVisible: false,
      workSessionsByDate: {},
      isProcessing: true,
    };

    this.oldestTimestamp = getTimestamp(getNWeeksBefore(WEEKS_BUFFER.size));
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
      // FIXME: Changing n-days has bugs
      // {
      //   icon: 'columns',
      //   handlePress: this.handlePressNDaysMenu,
      // },
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
    const {
      timeTotal, timeEffective, timezone, device,
    } = event;
    const percentage = ((timeEffective / timeTotal) * 100).toFixed(1);
    const line1 = `${day} - ${timezone}\n${startHour} - ${endHour}`;
    const line2 = `Total: ${prettyDuration(timeTotal)}\nEffective: ${prettyDuration(timeEffective)} (${percentage}%)`;
    const line3 = `Device: ${device}`;
    Alert.alert(
      event.description,
      `${line1}\n\n${line2}\n\n${line3}`,
    );
  }

  closeModal = () => {
    this.setState({
      nDaysMenuVisible: false,
    });
  }

  processWorkSessions = () => {
    const {
      workSessionsQuery, subjectsById, categoriesById,
    } = this.props;

    const workSessions = workSessionsQuery
      .filter((workSession) => (workSession.timestampStart > this.oldestTimestamp))
      .toModelArray();

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
            timezone: workSession.getPrettyTimezone(),
            device: workSession.device,
            timeTotal: workSession.timeTotal,
            timeEffective: workSession.timeEffective,
          };
        });
        this.setState({
          workSessionsByDate: bucketEventsByDate(events),
          isProcessing: false,
        });
      }, 0),
    );
  }

  saveWeekRef = (ref) => {
    this.weekViewRef = ref;
  }

  onSwipe = (newDate) => {
    const nWeeksToLimit = differenceInWeeks(newDate, this.oldestTimestamp * 1000);
    if (nWeeksToLimit < WEEKS_BUFFER.threshold) {
      const temp = getNWeeksBefore(WEEKS_BUFFER.size, newDate);
      this.oldestTimestamp = getTimestamp(temp);

      this.setState({
        isProcessing: true,
      }, () => this.processWorkSessions());
    }
  }

  render() {
    const {
      nDays, nDaysMenuVisible, workSessionsByDate, isProcessing,
    } = this.state;

    return (
      <WeekViewComponent>
        <Week
          workSessions={workSessionsByDate}
          nDays={nDays}
          selectedDate={this.today}
          isProcessing={isProcessing}
          onPressEvent={this.handlePressEvent}
          ref={this.saveWeekRef}
          onSwipePrev={this.onSwipe}
        />
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
  workSessionsQuery: workSessionsQuerySelector(state),
  subjectsById: subjectsByIdSelector(state),
  categoriesById: categoriesByIdSelector(state),
});

export default connect(mapStateToProps)(WeekView);
