import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { sub } from 'date-fns';
import { getToday, prettyDate } from '../../shared/dates';
import { subjectsSelector, categoriesSelector, workSessionsSelectorByRange } from '../../redux/selectors';
import { accumulateBySpan, endOfSpan } from '../../shared/timeCalculators';
import TimeChart from './TimeChart';
import styles from './styles';
import SpanSelector from './SpanSelector';

const DEFAULT_SPAN = 'days';

const getDefaultDates = (timeSpan) => {
  // For now, start and end dates are hard-coded,
  // and the chart does not support panning nor zoom
  // NOTE: date-fns should not be directly used??
  let startDate = null;
  const endDate = getToday();
  switch (timeSpan) {
    case 'days':
      startDate = sub(endDate, { days: 30 });
      break;
    case 'weeks':
      startDate = sub(endDate, { weeks: 20 });
      break;
    case 'months':
      startDate = sub(endDate, { months: 12 });
      break;
    case 'years':
      startDate = sub(endDate, { years: 3 });
      break;
    default:
      break;
  }
  return { startDate, endDate };
};

const TimeChartContainer = ({ route }) => {
  const [timeSpan, changeTimeSpan] = useState(DEFAULT_SPAN);

  const { startDate, endDate } = useMemo(() => getDefaultDates(timeSpan), [timeSpan]);

  const subjects = useSelector(
    (state) => subjectsSelector(state, { archived: 'all' }),
  );
  // const categories = useSelector(state => categoriesSelector(state));
  const workSessions = useSelector(
    (state) => workSessionsSelectorByRange(state, {
      startDate,
      endDate: endOfSpan(endDate, timeSpan),
    }),
  );
  console.log('N: ', subjects.length, workSessions.length, accumulateBySpan);

  const chartData = accumulateBySpan(workSessions, startDate, endDate, timeSpan);
  // console.log('CHART: ', chartData.map(d => `\n${d.stamp} - ${Math.floor(d.totalTime)}`));

  return (
    <View style={styles.container}>
      <TimeChart
        data={chartData}
        timeSpan={timeSpan}
      />
      <SpanSelector
        spanSelected={timeSpan}
        changeTimeSpan={changeTimeSpan}
      />
    </View>
  );
};

export default TimeChartContainer;
