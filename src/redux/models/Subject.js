import { attr, Model } from 'redux-orm';
import { isBetween } from '../../shared/utils';

class Subject extends Model {
  sumTimes(initialDate, endingDate, daysWorked) {
    let timeTotal = 0;
    let timeEffective = 0;
    this.worksessionSet.toModelArray().forEach((workSession) => {
      if (!isBetween(initialDate, endingDate, workSession.date)) {
        return;
      }
      daysWorked[workSession.date] = true; // eslint-disable-line no-param-reassign
      timeTotal += workSession.timeTotal;
      timeEffective += workSession.timeEffective;
    });

    return {
      timeTotal,
      timeEffective,
    };
  }

  delete() {
    this.worksessionSet.toModelArray().forEach(workSession => workSession.delete());
    super.delete();
  }
}

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
};

export default Subject;
