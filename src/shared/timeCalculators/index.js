import { makeFunctionAsync } from '../utils';
import TimeStats from './TimeStats';
import WSTimeAccumulator from './accumulator';

const calculatorCreator = (action) => makeFunctionAsync((...params) => {
  const timeStats = new TimeStats();
  timeStats[action](...params);
  return timeStats.getStats();
});

export const sumTimesCalc = calculatorCreator('sumTimes'); // DEPRECATED
export const sumSubjectTimesCalc = calculatorCreator('sumSubjectTimes'); // DEPRECATED

export const getEmptyStats = () => (new TimeStats()).getStats(); // DEPRECATED

/**
 * Sums total and effective time in a QuerySet of WorkSessions.
 *
 * @param {QuerySet} workSessionSet
 * @returns Object with { timeTotal, timeEffective }
 */
export const sumWSSetTimes = async (workSessionSet) => {
  if (!workSessionSet) return {};
  const accum = new WSTimeAccumulator();
  workSessionSet.toModelArray().forEach((ws) => {
    accum.accumulate(ws);
  });
  return accum.reduce();
};

export * from './TimeBySpan';
