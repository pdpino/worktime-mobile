import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'; // REVIEW: try to hide moment
import {
  SummaryComponent, SubjectsDetailComponent, DateFilterComponent,
  DateShortcutsComponent,
} from '../../components/dashboard/main';
import { subjectsSelector } from '../../redux/selectors';
import {
  isSameDay, getToday, getStartOfWeek, getEndOfWeek, getStartOfMonth,
  getEndOfMonth, getStartOfSemester, shiftMonths, shiftSemesters, subtractDays,
  getDiffDays, Memoizer,
} from '../../shared/utils';
import { sumTimesCalc, getEmptyStats } from '../../shared/timeCalculators';

class Dashboard extends React.Component {
  static isSameDay(dateA, dateB) {
    return (!dateA && !dateB) || isSameDay(dateA, dateB);
  }

  static getAllSubjectsSelected(subjects) {
    const selectedSubjectsIds = {};
    subjects.forEach((subject) => {
      selectedSubjectsIds[subject.id] = true;
    });
    return selectedSubjectsIds;
  }

  constructor(props) {
    super(props);

    this.state = {
      initialDate: getToday(),
      endingDate: getToday(),
      dateShortcutSelection: { key: 'day', shifted: 0 },
      selectedSubjectsIds: Dashboard.getAllSubjectsSelected(this.props.subjects),
      allSubjectsSelected: true,
      timeStats: getEmptyStats(),
      isLoading: true,
    };

    this.handleChangeInitialDate = this.handleChangeDate('initialDate');
    this.handleChangeEndingDate = this.handleChangeDate('endingDate');
    this.handleChangeDates = this.handleChangeDates.bind(this);
    this.handleShiftDate = this.handleShiftDate.bind(this);
    this.handleSelectSubject = this.handleSelectSubject.bind(this);
    this.handleSelectAllSubjects = this.handleSelectAllSubjects.bind(this);

    this.sumTimes = this.sumTimes.bind(this);
    this.memoizer = Memoizer();

    this.createShortcuts();
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', this.sumTimes);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  setStateWrapper(params) {
    this.setState({
      ...params,
      isLoading: true,
    }, () => this.sumTimes());
  }

  createShortcuts() {
    const getDayShifter = amount => (initialDate, endingDate, shift) => ({
      initialDate: subtractDays(initialDate, -shift * amount),
      endingDate: subtractDays(endingDate, -shift * amount),
    });

    // DICTIONARY
    this.shortcuts = [
      {
        key: 'day',
        label: 'Today',
        callback: () => this.handleChangeDates(getToday(), getToday(), 'day'),
        shifter: getDayShifter(1),
      },
      {
        key: 'week',
        label: 'This week',
        callback: () => this.handleChangeDates(
          getStartOfWeek(),
          getEndOfWeek(),
          'week',
        ),
        shifter: getDayShifter(7),
      },
      {
        key: 'month',
        label: 'This month',
        callback: () => this.handleChangeDates(
          getStartOfMonth(),
          getEndOfMonth(),
          'month',
        ),
        shifter: (initialDate, _, shift) => shiftMonths(initialDate, shift),
      },
      {
        key: 'semester',
        label: 'This Semester',
        callback: () => this.handleChangeDates(
          getStartOfSemester(),
          getToday(),
          'semester',
        ),
        shifter: (initialDate, _, shift) => shiftSemesters(initialDate, shift),
      },
      {
        key: 'none',
        label: 'All time',
        callback: () => this.handleChangeDates(null, getToday(), 'none'),
      },
    ];

    this.dateShifters = {};
    this.shortcuts.forEach((shortcut) => {
      this.dateShifters[shortcut.key] = shortcut.shifter;
    });
  }

  handleChangeDate(key) {
    return (dateString) => {
      if (Dashboard.isSameDay(this.state[key], dateString)) {
        return;
      }
      this.setStateWrapper({
        [key]: moment(dateString),
        dateShortcutSelection: null,
      });
    };
  }

  handleChangeDates(newInitialDate, newEndingDate, shortcutKey) {
    const { initialDate, endingDate } = this.state;
    if (Dashboard.isSameDay(initialDate, newInitialDate)
      && Dashboard.isSameDay(endingDate, newEndingDate)) {
      return;
    }
    this.setStateWrapper({
      initialDate: newInitialDate,
      endingDate: newEndingDate,
      dateShortcutSelection: {
        key: shortcutKey,
        shifted: 0,
      },
    });
  }

  handleShiftDate(direction) {
    const { dateShortcutSelection, initialDate, endingDate } = this.state;
    const rightShift = direction === 'right' ? 1 : -1;

    let shifter;
    let shift;
    let newSelection;
    if (!dateShortcutSelection) {
      shifter = this.dateShifters.day;
      const nDays = getDiffDays(initialDate, endingDate);
      shift = nDays * rightShift;
      newSelection = null;
    } else {
      const { key, shifted } = dateShortcutSelection;
      shifter = this.dateShifters[key];
      if (!shifter) {
        return;
      }
      shift = rightShift;
      newSelection = { key, shifted: shifted + rightShift };
    }
    const newDates = shifter(initialDate, endingDate, shift);

    this.setStateWrapper({
      dateShortcutSelection: newSelection,
      initialDate: newDates.initialDate,
      endingDate: newDates.endingDate,
    });
  }

  handleSelectSubject(subjectId) {
    const selectedSubjectsIds = {
      ...this.state.selectedSubjectsIds,
      [subjectId]: !this.state.selectedSubjectsIds[subjectId],
    };
    const anySelected = Object.keys(selectedSubjectsIds)
      .some(key => selectedSubjectsIds[key]);

    this.setStateWrapper({
      selectedSubjectsIds,
      allSubjectsSelected: anySelected,
    });
  }

  handleSelectAllSubjects() {
    const { allSubjectsSelected } = this.state;
    const selectedSubjectsIds = allSubjectsSelected ? {}
      : Dashboard.getAllSubjectsSelected(this.props.subjects);
    this.setStateWrapper({
      selectedSubjectsIds,
      allSubjectsSelected: !allSubjectsSelected,
    });
  }

  sumTimes() {
    const { subjects } = this.props;
    const { initialDate, endingDate, selectedSubjectsIds } = this.state;

    if (!this.memoizer.hasChanged(subjects, initialDate, endingDate, selectedSubjectsIds)) {
      this.setState({ isLoading: false });
      return;
    }

    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }

    sumTimesCalc(subjects, initialDate, endingDate, selectedSubjectsIds)
      .then(timeStats => this.setState({
        isLoading: false,
        timeStats,
      }));
  }

  render() {
    const {
      initialDate, endingDate, dateShortcutSelection,
      selectedSubjectsIds, allSubjectsSelected, isLoading, timeStats,
    } = this.state;
    const { subjectsSummaries, timeTotal } = timeStats;

    return (
      <ScrollView style={{ flex: 1 }}>
        <DateFilterComponent
          initialDate={initialDate}
          endingDate={endingDate}
          onChangeInitialDate={this.handleChangeInitialDate}
          onChangeEndingDate={this.handleChangeEndingDate}
        />
        <DateShortcutsComponent
          shortcuts={this.shortcuts}
          shortcutSelection={dateShortcutSelection}
          initialDate={initialDate}
          endingDate={endingDate}
          onPressLeft={() => this.handleShiftDate('left')}
          onPressRight={() => this.handleShiftDate('right')}
        />
        <SummaryComponent
          timeStats={timeStats}
          isLoading={isLoading}
        />
        <SubjectsDetailComponent
          subjectsSummaries={subjectsSummaries}
          selectedSubjectsIds={selectedSubjectsIds}
          allSubjectsSelected={allSubjectsSelected}
          subjectsTimeTotal={timeTotal}
          onSelectSubject={this.handleSelectSubject}
          onSelectAllSubjects={this.handleSelectAllSubjects}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state, { archived: false }),
});

export default connect(mapStateToProps)(Dashboard);
