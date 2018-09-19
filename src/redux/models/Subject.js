import { attr, Model } from 'redux-orm';
import { isBetween } from '../../shared/utils';

class Subject extends Model {
  sumTimes(initialDate, endingDate) {
    let timeTotal = 0;
    let timeEffective = 0;
    this.worksessionSet.toModelArray().forEach((workSession) => {
      if (!isBetween(initialDate, endingDate, workSession.date)) {
        return;
      }
      timeTotal += workSession.timeTotal;
      timeEffective += workSession.timeEffective;
    });

    return {
      timeTotal,
      timeEffective,
    };
  }
}

Subject.modelName = 'Subject';

Subject.fields = {
  id: attr(),
  name: attr(),
  description: attr(),
};

export default Subject;
