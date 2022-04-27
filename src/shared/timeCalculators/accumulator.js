/**
 * Sums the total and effective times in work-sessions.
 */
class WSTimeAccumulator {
  constructor(obj) {
    this.obj = (obj || {});

    this.timeTotal = 0;
    this.timeEffective = 0;
  }

  accumulate(workSession) {
    this.timeTotal += workSession.timeTotal;
    this.timeEffective += workSession.timeEffective;
  }

  reduce() {
    const {
      obj, timeTotal, timeEffective,
    } = this;
    return {
      ...obj,
      timeTotal,
      timeEffective,
    };
  }
}

export default WSTimeAccumulator;
