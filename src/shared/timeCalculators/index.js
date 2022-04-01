import { makeFunctionAsync } from '../utils';
import TimeStats from './TimeStats';

const calculatorCreator = (action) => makeFunctionAsync((...params) => {
  const timeStats = new TimeStats();
  timeStats[action](...params);
  return timeStats.getStats();
});

export const sumTimesCalc = calculatorCreator('sumTimes'); // DEPRECATED
export const sumSubjectTimesCalc = calculatorCreator('sumSubjectTimes'); // DEPRECATED

export const getEmptyStats = () => (new TimeStats()).getStats(); // DEPRECATED

export * from './TimeBySpan';
