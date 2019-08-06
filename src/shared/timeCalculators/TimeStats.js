import {
  isBetween, isBefore, getDateCopy, smartDivision, countWeeks,
} from '../utils';

class TimeStats {
  constructor() {
    this.daysWorked = {};
    this.timeTotal = 0;
    this.timeEffective = 0;
    this.subjectsSummaries = [];

    this.firstDate = null;
    this.lastDate = null;
  }

  updateDates(date) {
    this.daysWorked[date] = true;

    if (!this.firstDate || isBefore(date, this.firstDate)) {
      this.firstDate = getDateCopy(date);
    }

    if (!this.lastDate || isBefore(this.lastDate, date)) {
      this.lastDate = getDateCopy(date);
    }
  }

  sumSubjectTimesReturn(subject, initialDate, endingDate) {
    let timeTotal = 0;
    let timeEffective = 0;
    subject.getWorkSessions({ sorted: false }).forEach((workSession) => {
      if (!isBetween(initialDate, endingDate, workSession.date)) {
        return;
      }
      this.updateDates(workSession.date);
      timeTotal += workSession.timeTotal;
      timeEffective += workSession.timeEffective;
    });

    return {
      timeTotal,
      timeEffective,
    };
  }

  sumSubjectTimes(...params) {
    const { timeTotal, timeEffective } = this.sumSubjectTimesReturn(...params);
    this.timeTotal = timeTotal;
    this.timeEffective = timeEffective;
  }

  sumTimes(subjects, initialDate, endingDate, selectedSubjectsIds) {
    let addedTotal = 0;
    let addedEffective = 0;

    this.subjectsSummaries = subjects.map((subject) => {
      const { id } = subject;
      const name = subject.getNameWithCategory();

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
      } = this.sumSubjectTimesReturn(subject, initialDate, endingDate);
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

    this.timeTotal = addedTotal;
    this.timeEffective = addedEffective;
  }

  getStats() {
    const nDaysWorked = Object.keys(this.daysWorked).length;
    const dayAvg = smartDivision(this.timeTotal, nDaysWorked, false);

    const nWeeksWorked = (this.firstDate && this.lastDate)
      ? countWeeks(this.firstDate, this.lastDate) : 0;
    const weekAvg = smartDivision(this.timeTotal, nWeeksWorked, false);

    return {
      ...this,
      nDaysWorked,
      dayAvg,
      nWeeksWorked,
      weekAvg,
    };
  }
}

export default TimeStats;
