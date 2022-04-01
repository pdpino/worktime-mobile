import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { prettyDate } from '../../shared/dates';
import { subjectsSelector, categoriesSelector, workSessionsSelectorByRange } from '../../redux/selectors';
import { accumulateBySpan, endOfSpan } from '../../shared/timeCalculators';
import TimeChart from './TimeChart';
import styles from './styles';

const START_DATE = new Date(2019, 11, 1);
const END_DATE = new Date(2020, 12, 1);
const SPAN = 'days';

const TimeChartContainer = ({ route }) => {
  const subjects = useSelector(
    state => subjectsSelector(state, { archived: 'all' }),
  );
  // const categories = useSelector(state => categoriesSelector(state));
  const workSessions = useSelector(
    state => workSessionsSelectorByRange(state, {
      startDate: START_DATE,
      endDate: endOfSpan(END_DATE, SPAN),
    }),
  );
  console.log('N: ', subjects.length, workSessions.length, accumulateBySpan);

  const chartData = accumulateBySpan(workSessions, START_DATE, END_DATE, SPAN);
  // console.log('CHART: ', chartData.map(d => `\n${d.stamp} - ${Math.floor(d.totalTime)}`));

  return (
    <View style={styles.container}>
      <TimeChart
        data={chartData}
      />
    </View>
  );
};

export default TimeChartContainer;
