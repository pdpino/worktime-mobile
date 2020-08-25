import { makeFunctionAsync } from '../utils';
import TimeStats from './TimeStats';

const calculatorCreator = (action) => makeFunctionAsync((...params) => {
  const timeStats = new TimeStats();
  timeStats[action](...params);
  return timeStats.getStats();
});

export const sumTimesCalc = calculatorCreator('sumTimes');
export const sumSubjectTimesCalc = calculatorCreator('sumSubjectTimes');

export const getEmptyStats = () => (new TimeStats()).getStats();
