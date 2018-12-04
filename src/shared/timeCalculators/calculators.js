import TimeStats from './TimeStats';

const calculatorCreator = action => (...params) => new Promise(resolve => setTimeout(() => {
  // HACK: usage of setTimeout
  // using InteractionManager.runAfterInteractions did not work well with
  // react-navigation tab changes
  const timeStats = new TimeStats();
  timeStats[action](...params);
  resolve(timeStats.getStats());
}, 0));

export const sumTimesCalc = calculatorCreator('sumTimes');
export const sumSubjectTimesCalc = calculatorCreator('sumSubjectTimes');

export const getEmptyStats = () => (new TimeStats()).getStats();
