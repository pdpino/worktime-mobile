import React, { useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { sub } from 'date-fns';
import { getToday } from '../../shared/dates';
import { workSessionsSelectorByRange } from '../../redux/selectors';
import { accumulateBySpan, endOfSpan } from '../../shared/timeCalculators';
import TimeChart from './TimeChart';
import styles from './styles';

const AVAILABLE_SPANS = [
  'days',
  'weeks',
  'months',
  'years',
];
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

const TimeChartContainer = () => {
  const [timeSpan, circleThroughSpans] = useReducer(
    (currentSpan) => {
      const currentIndex = AVAILABLE_SPANS.findIndex(
        (span) => span === currentSpan,
      );
      if (currentIndex === -1) {
        // internal error
        return currentSpan;
      }
      const nextIndex = (currentIndex + 1) % AVAILABLE_SPANS.length;
      return AVAILABLE_SPANS[nextIndex];
    },
    DEFAULT_SPAN,
  );

  const { startDate, endDate } = useMemo(() => getDefaultDates(timeSpan), [timeSpan]);

  const workSessions = useSelector(
    (state) => workSessionsSelectorByRange(state, {
      startDate,
      endDate: endOfSpan(endDate, timeSpan),
    }),
  );

  const chartData = accumulateBySpan(workSessions, startDate, endDate, timeSpan);

  return (
    <View style={styles.container}>
      <TimeChart
        data={chartData}
        timeSpan={timeSpan}
        target="total"
        circleThroughSpans={circleThroughSpans}
      />
    </View>
  );
};

export default TimeChartContainer;
