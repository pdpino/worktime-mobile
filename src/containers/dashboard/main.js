import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'; // REVIEW: try to hide moment
import {
  SummaryComponent, SubjectsDetailComponent, DateFilterComponent,
} from '../../components/dashboard/main';
import { subjectsSelector } from '../../redux/selectors';
import {
  smartDivision,
  getToday, getYesterday, getStartOfWeek, getStartOfMonth, subtractDays,
} from '../../shared/utils';

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
    };

    this.handleChangeInitialDate = this.handleChangeDate('initialDate');
    this.handleChangeEndingDate = this.handleChangeDate('endingDate');
    this.handleSelectSubject = this.handleSelectSubject.bind(this);
    this.handleSelectAllSubjects = this.handleSelectAllSubjects.bind(this);
  }

  handleChangeDate(key) {
    return (dateString) => {
      this.setState({ [key]: moment(dateString) });
    };
  }

  handleSelectSubject(subjectId) {
    this.setState(state => ({
      selectedSubjectsIds: {
        ...state.selectedSubjectsIds,
        [subjectId]: !state.selectedSubjectsIds[subjectId],
      },
    }));
  }

  handleSelectAllSubjects() {
    this.setState((state, props) => ({
      selectedSubjectsIds: Dashboard.getAllSubjectsSelected(props.subjects),
    }));
  }

  sumTimes() {
    const { subjects } = this.props;
    const { initialDate, endingDate, selectedSubjectsIds } = this.state;
    let addedTotal = 0;
    let addedEffective = 0;

    const daysWorked = {};

    const subjectsSummaries = subjects.map((subject) => {
      const { name, id } = subject;
      if (!selectedSubjectsIds[subject.id]) {
        return {
          id,
          name,
          timeTotal: 0,
          timeEffective: 0,
        };
      }
      const {
        timeTotal: subjectTotal,
        timeEffective: subjectEffective,
      } = subject.sumTimes(initialDate, endingDate, daysWorked);
      addedTotal += subjectTotal;
      addedEffective += subjectEffective;

      return {
        id,
        name,
        timeTotal: subjectTotal,
        timeEffective: subjectEffective,
      };
    }).sort((subj1, subj2) => {
      const onlyOneSelected = !!selectedSubjectsIds[subj2.id] - !!selectedSubjectsIds[subj1.id];
      return onlyOneSelected || (subj2.timeTotal - subj1.timeTotal);
    });

    return {
      subjectsSummaries,
      timeTotal: addedTotal,
      timeEffective: addedEffective,
      daysWorked,
    };
  }

  render() {
    const { initialDate, endingDate, selectedSubjectsIds } = this.state;
    const {
      subjectsSummaries,
      timeTotal,
      timeEffective,
      daysWorked,
    } = this.sumTimes();

    const nDaysWorked = Object.keys(daysWorked).length;
    const averagePerDay = smartDivision(timeTotal, nDaysWorked, false);

    const shortcuts = [
      {
        name: 'none',
        callback: () => this.setState({
          initialDate: null,
          endingDate: null,
        }),
      },
      {
        name: 'today',
        callback: () => this.setState({
          initialDate: getToday(),
          endingDate: getToday(),
        }),
      },
      {
        name: 'yesterday',
        callback: () => this.setState({
          initialDate: getYesterday(),
          endingDate: getYesterday(),
        }),
      },
      {
        name: 'thisWeek',
        callback: () => this.setState({
          initialDate: getStartOfWeek(),
          endingDate: getToday(),
        }),
      },
      {
        name: 'lastWeek',
        callback: () => {
          const pastMonday = getStartOfWeek();
          this.setState({
            initialDate: subtractDays(pastMonday, 7),
            endingDate: subtractDays(pastMonday, 1),
          });
        },
      },
      {
        name: 'thisMonth',
        callback: () => this.setState({
          initialDate: getStartOfMonth(),
          endingDate: getToday(),
        }),
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
        />
        <SubjectsDetailComponent
          subjectsSummaries={subjectsSummaries}
          selectedSubjectsIds={selectedSubjectsIds}
          subjectsTotal={timeTotal}
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
