import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'; // REVIEW: try to hide moment
import {
  SummaryComponent, SubjectsDetailComponent, DateFilterComponent,
} from '../../components/dashboard/main';
import { subjectsSelector } from '../../redux/selectors';
import {
  isSameDay, getToday, getYesterday, getStartOfWeek, getStartOfMonth, subtractDays,
  Memoizer,
} from '../../shared/utils';
import { sumTimesCalc, getEmptyStats } from '../../shared/timeCalculators';

class Dashboard extends React.Component {
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
      selectedSubjectsIds: Dashboard.getAllSubjectsSelected(this.props.subjects),
      allSubjectsSelected: true,
      timeStats: getEmptyStats(),
      isLoading: true,
    };

    this.handleChangeInitialDate = this.handleChangeDate('initialDate');
    this.handleChangeEndingDate = this.handleChangeDate('endingDate');
    this.handleChangeDates = this.handleChangeDates.bind(this);
    this.handleSelectSubject = this.handleSelectSubject.bind(this);
    this.handleSelectAllSubjects = this.handleSelectAllSubjects.bind(this);

    this.sumTimes = this.sumTimes.bind(this);
    this.memoizer = Memoizer();
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

  handleChangeDate(key) {
    return (dateString) => {
      if (isSameDay(this.state[key], dateString)) {
        return;
      }
      this.setStateWrapper({ [key]: moment(dateString) });
    };
  }

  handleChangeDates(newInitialDate, newEndingDate) {
    const { initialDate, endingDate } = this.state;
    if (isSameDay(initialDate, newInitialDate) && isSameDay(endingDate, newEndingDate)) {
      return;
    }
    this.setStateWrapper({
      initialDate: newInitialDate,
      endingDate: newEndingDate,
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
      initialDate, endingDate, selectedSubjectsIds, allSubjectsSelected, isLoading,
      timeStats,
    } = this.state;
    const {
      subjectsSummaries, timeTotal, timeEffective, nDaysWorked, averagePerDay,
    } = timeStats;

    // FIXME: this callbacks are always the same!
    // don't recreate them in each render
    const shortcuts = [
      {
        name: 'none',
        callback: () => this.handleChangeDates(null, null),
      },
      {
        name: 'today',
        callback: () => this.handleChangeDates(getToday(), getToday()),
      },
      {
        name: 'yesterday',
        callback: () => this.handleChangeDates(getYesterday(), getYesterday()),
      },
      {
        name: 'thisWeek',
        callback: () => this.handleChangeDates(getStartOfWeek(), getToday()),
      },
      {
        name: 'lastWeek',
        callback: () => {
          const pastMonday = getStartOfWeek();
          this.handleChangeDates(subtractDays(pastMonday, 7), subtractDays(pastMonday, 1));
        },
      },
      {
        name: 'thisMonth',
        callback: () => this.handleChangeDates(getStartOfMonth(), getToday()),
      },
    ];

    return (
      <ScrollView style={{ flex: 1 }}>
        <DateFilterComponent
          initialDate={initialDate}
          endingDate={endingDate}
          onChangeInitialDate={this.handleChangeInitialDate}
          onChangeEndingDate={this.handleChangeEndingDate}
          shortcuts={shortcuts}
        />
        <SummaryComponent
          timeTotal={timeTotal}
          timeEffective={timeEffective}
          nDaysWorked={nDaysWorked}
          averagePerDay={averagePerDay}
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
  subjects: subjectsSelector(state),
});

export default connect(mapStateToProps)(Dashboard);
