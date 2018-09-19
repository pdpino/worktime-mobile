import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'; // REVIEW: try to hide moment
import { SummaryComponent, SubjectsFilterComponent } from '../../components/dashboard/main';
import { subjectsSelector } from '../../redux/selectors';
import { DateRangeFilter } from '../../shared/UI/pickers';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialDate: moment(),
      endingDate: moment(),
      selectedSubjectsIds: {},
    };

    this.handleChangeInitialDate = this.handleChangeDate('initialDate');
    this.handleChangeEndingDate = this.handleChangeDate('endingDate');
    this.handleSelectSubject = this.handleSelectSubject.bind(this);
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

  sumTimes() {
    const { subjects } = this.props;
    const { initialDate, endingDate, selectedSubjectsIds } = this.state;
    let addedTotal = 0;
    let addedEffective = 0;

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
      } = subject.sumTimes(initialDate, endingDate);
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
    };
  }

  render() {
    const { initialDate, endingDate, selectedSubjectsIds } = this.state;
    const {
      subjectsSummaries,
      timeTotal,
      timeEffective,
    } = this.sumTimes();

    const effectivePercentage = timeTotal > 0 ? (timeEffective / timeTotal * 100).toFixed(1) : 0;

    return (
      <View style={{ flex: 1 }}>
        <SummaryComponent
          timeTotal={timeTotal}
          timeEffective={timeEffective}
          effectivePercentage={effectivePercentage}
        />
        <DateRangeFilter
          initialDate={initialDate}
          endingDate={endingDate}
          onChangeInitialDate={this.handleChangeInitialDate}
          onChangeEndingDate={this.handleChangeEndingDate}
        />
        <SubjectsFilterComponent
          subjectsSummaries={subjectsSummaries}
          selectedSubjectsIds={selectedSubjectsIds}
          onSelectSubject={this.handleSelectSubject}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
});

export default connect(mapStateToProps)(Dashboard);
