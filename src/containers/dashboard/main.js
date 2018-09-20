import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'; // REVIEW: try to hide moment
import {
  SummaryComponent, SubjectsFilterComponent, DateFilterComponent,
} from '../../components/dashboard/main';
import { subjectsSelector } from '../../redux/selectors';
import { smartDivision } from '../../shared/utils';

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
      initialDate: moment(),
      endingDate: moment(),
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
    }).sort((subj1, subj2) => subj2.timeTotal - subj1.timeTotal);

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

    const effectivePercentage = smartDivision(timeEffective, timeTotal, true, 0);
    const nDaysWorked = Object.keys(daysWorked).length;
    const averagePerDay = smartDivision(timeTotal, nDaysWorked, false);

    return (
      <View style={{ flex: 1 }}>
        <SummaryComponent
          timeTotal={timeTotal}
          timeEffective={timeEffective}
          effectivePercentage={effectivePercentage}
          initialDate={initialDate}
          endingDate={endingDate}
          nDaysWorked={nDaysWorked}
          averagePerDay={averagePerDay}
        />
        <DateFilterComponent
          initialDate={initialDate}
          endingDate={endingDate}
          onChangeInitialDate={this.handleChangeInitialDate}
          onChangeEndingDate={this.handleChangeEndingDate}
        />
        <SubjectsFilterComponent
          subjectsSummaries={subjectsSummaries}
          selectedSubjectsIds={selectedSubjectsIds}
          onSelectSubject={this.handleSelectSubject}
          onSelectAllSubjects={this.handleSelectAllSubjects}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
});

export default connect(mapStateToProps)(Dashboard);
