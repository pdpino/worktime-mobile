import { isBetween, smartDivision } from '.';

class TimeStats {
  constructor() {
    this.daysWorked = {};
    this.timeTotal = 0;
    this.timeEffective = 0;
    this.subjectsSummaries = [];
  }

  sumTimes(subjects, initialDate, endingDate, selectedSubjectsIds) {
    let addedTotal = 0;
    let addedEffective = 0;

    this.subjectsSummaries = subjects.map((subject) => {
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
      } = this.sumSubjectTimes(subject, initialDate, endingDate);
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

  sumSubjectTimes(subject, initialDate, endingDate) {
    let timeTotal = 0;
    let timeEffective = 0;
    subject.getWorkSessions({ sorted: false }).forEach((workSession) => {
      if (!isBetween(initialDate, endingDate, workSession.date)) {
        return;
      }
      this.daysWorked[workSession.date] = true;
      timeTotal += workSession.timeTotal;
      timeEffective += workSession.timeEffective;
    });

    return {
      timeTotal,
      timeEffective,
    };
  }

  getStats() {
    const nDaysWorked = Object.keys(this.daysWorked).length;
    const averagePerDay = smartDivision(this.timeTotal, nDaysWorked, false);

    return {
      ...this,
      nDaysWorked,
      averagePerDay,
    };
  }
}

export default TimeStats;
