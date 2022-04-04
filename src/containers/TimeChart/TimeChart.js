import React from 'react';
import {
  Svg, Path, Text, G as Group, Rect,
} from 'react-native-svg';
import { format, getYear } from 'date-fns';
import styles from './styles';

// // dummy debug data
// const DUMMY_DATA = [
//   {
//     date: new Date(2022, 2, 26),
//     totalTime: 3,
//     effectiveTime: 2.5,
//   },
//   {
//     date: new Date(2022, 2, 27),
//     totalTime: 0,
//     effectiveTime: 0,
//   },
//   {
//     date: new Date(2022, 2, 28),
//     totalTime: 0,
//     effectiveTime: 0,
//   },
//   {
//     date: new Date(2022, 2, 29),
//     totalTime: 7,
//     effectiveTime: 5,
//   },
//   {
//     date: new Date(2022, 2, 30),
//     totalTime: 3,
//     effectiveTime: 1,
//   },
//   {
//     date: new Date(2022, 2, 31),
//     totalTime: 5,
//     effectiveTime: 4,
//   },
// ];

const HEIGHT = 200;
const WIDTH = 300;
const MARGIN = {
  top: 10, right: 30, bottom: 30, left: 30,
};
const CHART_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const CHART_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

const AXIS_COLOR = 'black';
const TICK_SIZE = 5;
const MAX_TICKS = 4;

const formatXTick = (date, timeSpan) => {
  // TODO: improve this function further?
  // ticks may overlap!
  const isSameYear = getYear(date) === getYear(new Date());

  switch (timeSpan) {
    case 'years':
      return format(date, 'y');
    case 'months':
      if (isSameYear) {
        return format(date, 'MMM');
      }
      return format(date, 'y-MMM');
    case 'weeks':
    case 'days':
      if (isSameYear) {
        return format(date, 'MMM-dd');
      }
      return format(date, 'y-MMM-dd');
    default:
      throw Error(`Wrong timeSpan in formatXTick: ${timeSpan}, ${date}`);
  }
};

const TimeChart = ({
  data, timeSpan,
}) => {
  // In chart coordinates
  const bandwidth = CHART_WIDTH / data.length;
  const limX = data.length;
  const maxY = Math.max(...data.map((d) => d.totalTime));
  const limY = maxY * 1.1;

  const indexToX = (index) => Math.floor((index / limX) * CHART_WIDTH + bandwidth / 2);
  const timeToY = (time) => Math.floor(CHART_HEIGHT - (time / limY) * CHART_HEIGHT);

  const smoothingCurve = 'L';

  const totalPoints = [];
  const effPoints = [];
  const totalPath = [];
  const effPath = [];

  data.forEach((point, index) => {
    const { date, totalTime, effectiveTime } = point;

    const cx = indexToX(index);
    const cyTotal = timeToY(totalTime);
    const cyEff = timeToY(effectiveTime);
    // const r = 2;
    // totalPoints.push((
    //   <Circle key={`tot-${index.toString()}`} cx={cx} cy={cyTotal} r={r} fill="blue" />
    // ));
    // effPoints.push((
    //   <Circle key={`eff-${index.toString()}`} cx={cx} cy={cyEff} r={r} fill="green" />
    // ));

    totalPath.push(...[index === 0 ? 'M' : smoothingCurve, cx, cyTotal]);
    effPath.push(...[index === 0 ? 'M' : smoothingCurve, cx, cyEff]);
  });

  const buildTextForPath = (path, label, color) => {
    if (path.length <= 2) {
      return null;
    }
    const lastPointX = path[path.length - 2];
    const lastPointY = path[path.length - 1];

    return (
      <Text x={lastPointX + 5} y={lastPointY} textAnchor="start" fill={color}>
        {label}
      </Text>
    );
  };

  const path1 = totalPath.join(' ');
  const path2 = effPath.join(' ');

  // In original coordinates
  const xOrigin = MARGIN.left;
  const yOrigin = MARGIN.top + CHART_HEIGHT;

  const xAxisPath = `M ${xOrigin} ${yOrigin} H ${MARGIN.left + CHART_WIDTH}`;
  const yAxisPath = `M ${xOrigin} ${yOrigin} V ${MARGIN.top}`;

  const xAxis = <Path d={xAxisPath} stroke={AXIS_COLOR} />;
  const yAxis = <Path d={yAxisPath} stroke={AXIS_COLOR} />;

  const xTicks = [];
  const xStep = Math.ceil(data.length / MAX_TICKS);
  for (let index = 0; index < data.length; index += xStep) {
    const x1 = MARGIN.left + indexToX(index);
    const y1 = MARGIN.top + CHART_HEIGHT;
    const path = `M ${x1} ${y1} v ${TICK_SIZE}`;

    xTicks.push(...[
      <Path key={`xtick-${index.toString()}`} d={path} stroke={AXIS_COLOR} />,
      <Text
        key={`xticklabel-${index.toString()}`}
        x={x1}
        y={y1 + TICK_SIZE * 3}
        fill="black"
        textAnchor="middle"
        rotate={0}
      >
        {formatXTick(data[index].date, timeSpan)}
      </Text>,
    ]);
  }

  const yTicks = [];
  const yStep = Math.ceil(maxY / MAX_TICKS);
  for (let yValue = 0; yValue < maxY; yValue += yStep) {
    const x1 = MARGIN.left;
    const y1 = MARGIN.top + timeToY(yValue);
    const path = `M ${x1} ${y1} h -${TICK_SIZE}`;
    yTicks.push(...[
      <Path key={`ytick-${yValue.toString()}`} d={path} stroke={AXIS_COLOR} />,
      <Text
        key={`yticklabel-${yValue.toString()}`}
        x={x1 - TICK_SIZE * 2}
        y={y1}
        fill="black"
        textAnchor="end"
        rotate={0}
      >
        {`${Math.floor(yValue)}h`}
      </Text>,
    ]);
  }

  return (
    <Svg x={0} y={0} width={WIDTH} height={HEIGHT} style={styles.svg}>
      <Group x={MARGIN.left} y={MARGIN.top}>
        {totalPoints}
        {effPoints}
        <Path d={path1} stroke="blue" />
        <Path d={path2} stroke="green" />
        {buildTextForPath(totalPath, 'Total', 'blue')}
        {buildTextForPath(effPath, 'Effective', 'green')}
      </Group>
      <Group>
        {xAxis}
        {xTicks}
      </Group>
      <Group>
        {yAxis}
        {yTicks}
      </Group>
    </Svg>
  );
};

export default TimeChart;
