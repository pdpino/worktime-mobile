import React from 'react';
import {
  Svg, Path, Text, G as Group, Rect,
} from 'react-native-svg';
import { format, getYear } from 'date-fns';
import styles from './styles';
import i18n from '../../shared/i18n';
import { colors, timeColors } from '../../shared/styles';
import { isNumber } from '../../shared/utils';
import { useChartDimensions, useHeightPercentage } from './useDimensions';

// // dummy debug data
// const DUMMY_DATA = [
//   {
//     date: new Date(2022, 3, 17),
//     totalTime: 3,
//     effectiveTime: 2.5,
//   },
//   {
//     date: new Date(2022, 3, 18),
//     totalTime: 0,
//     effectiveTime: 0,
//   },
//   {
//     date: new Date(2022, 3, 19),
//     totalTime: 0,
//     effectiveTime: 0,
//   },
//   {
//     date: new Date(2022, 3, 20),
//     totalTime: 7,
//     effectiveTime: 5,
//   },
//   {
//     date: new Date(2022, 3, 21),
//     totalTime: 3,
//     effectiveTime: 1,
//   },
//   {
//     date: new Date(2022, 3, 22),
//     totalTime: 5,
//     effectiveTime: 4,
//   },
// ];

const AXIS_COLOR = 'black';
const TICK_SIZE = 5;
const MAX_TICKS = 4;

const SPAN_BUTTON_HEIGHT = 20;

const TARGET_TO_EXTRACTOR = {
  total: (x) => x.totalTime,
  effective: (x) => x.effectiveTime,
  paused: (x) => x.totalTime - x.effectiveTime,
};

// TODO: move to utils
const amountToThousands = (amount) => {
  if (!isNumber(amount) || amount <= 0) {
    return '0';
  }

  const milestones = [
    { step: 1000000, abrev: 'm' },
    { step: 1000, abrev: 'k' },
  ];

  const milestone = milestones.find(({ step }) => amount > step);
  if (!milestone) {
    return amount.toString();
  }
  const { step, abrev } = milestone;
  const thousands = (amount / step).toFixed(1);
  return `${thousands}${abrev}`;
};

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

const XTicks = ({
  y, data, timeSpan, indexToX, xOffset,
}) => {
  const xTicks = [];
  const xStep = Math.ceil(data.length / MAX_TICKS);
  for (let index = 0; index < data.length; index += xStep) {
    const x1 = xOffset + indexToX(index);
    const path = `M ${x1} ${y} v ${TICK_SIZE}`;

    xTicks.push(...[
      <Path key={`xtick-${index.toString()}`} d={path} stroke={AXIS_COLOR} />,
      <Text
        key={`xticklabel-${index.toString()}`}
        x={x1}
        y={y + TICK_SIZE * 3}
        fill="black"
        textAnchor="middle"
        rotate={0}
      >
        {formatXTick(data[index].date, timeSpan)}
      </Text>,
    ]);
  }

  return xTicks;
};

const YTicks = ({
  x, timeToY, maxY, yOffset,
}) => {
  const yTicks = [];
  const yStep = Math.ceil(maxY / MAX_TICKS);
  for (let yValue = 0; yValue < maxY; yValue += yStep) {
    const x1 = x;
    const y1 = yOffset + timeToY(yValue);
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
        {`${amountToThousands(yValue)}`}
      </Text>,
    ]);
  }

  return yTicks;
};

const EmptyChartMessage = ({ dimensions, message }) => {
  const { height, width } = dimensions;
  return (
    <Text
      x={width / 2}
      y={height / 2}
      fill="black"
      textAnchor="middle"
      fontSize={20}
    >
      {message}
    </Text>
  );
};

const Chart = ({
  margins, data, target, indexToX, timeToY,
}) => {
  const valueExtractor = TARGET_TO_EXTRACTOR[target];
  const color = timeColors[target];
  const label = i18n.t(`chartLegend.${target}`);

  const path = ['M', indexToX(0), timeToY(0)];

  data.forEach((point, index) => {
    const timeValue = valueExtractor(point);

    const cx = indexToX(index);
    const cyTotal = timeToY(timeValue);

    if (!isNumber(cyTotal)) {
      // TODO: log this somewhere? throw error?
      return;
    }

    path.push(...['L', cx, cyTotal]);
  });

  // Place text next to the last point
  const textX = path[path.length - 2] + 5; // Give some margin
  const textY = path[path.length - 1];

  // Close the path
  path.push(...[
    'L', indexToX(data.length - 1), timeToY(0), // To xAxis
    'L', indexToX(0), timeToY(0), // To origin
  ]);

  return (
    <Group x={margins.left} y={margins.top} preserveAspectRatio="none">
      <Path d={path.join(' ')} fill={color} />
      <Text x={textX} y={textY} textAnchor="start" fill={color}>
        {label}
      </Text>
    </Group>
  );
};

const TimeChart = ({
  data, timeSpan, target, circleThroughSpans,
}) => {
  const [
    dimensions,
    margins,
    chartDimensions,
    onLayoutSvg,
  ] = useChartDimensions(data);

  const svgHeight = useHeightPercentage();

  const { height, width } = dimensions;
  const { height: chartHeight, width: chartWidth } = chartDimensions;

  // In original coordinates
  const xOrigin = margins.left;
  const yOrigin = margins.top + chartHeight;

  // In chart coordinates
  const limX = data.length;
  const maxY = Math.max(...data.map((d) => d.totalTime));
  const limY = maxY * 1.1;

  const indexToX = (index) => Math.floor((index / limX) * chartWidth);
  const timeToY = (time) => Math.floor(chartHeight - (time / limY) * chartHeight);

  const xAxis = (
    <Path
      d={`M ${xOrigin} ${yOrigin} H ${width - margins.right - 10}`}
      stroke={AXIS_COLOR}
    />
  );
  const yAxis = (
    <Path
      d={`M ${xOrigin} ${yOrigin} V ${margins.top}`}
      stroke={AXIS_COLOR}
    />
  );

  const yUnit = (
    <Text
      x={margins.left}
      y={margins.top - 5}
      textAnchor="middle"
      fill="black"
    >
      hrs
    </Text>
  );

  const xTicks = (
    <XTicks
      y={yOrigin}
      data={data}
      timeSpan={timeSpan}
      indexToX={indexToX}
      xOffset={margins.left}
    />
  );

  const spanSelector = (
    <Group
      x={width - margins.right}
      y={margins.top + chartHeight}
    >
      <Rect
        width={45}
        height={SPAN_BUTTON_HEIGHT}
        y={-SPAN_BUTTON_HEIGHT / 2}
        fill={colors.lightBlue}
        strokeWidth={1}
        stroke="black"
        onPress={circleThroughSpans}
      />
      <Text
        x={5}
        fill="black"
        pointerEvents="none"
        alignmentBaseline="middle"
      >
        {i18n.t(`timeSpans.${timeSpan}`)}
      </Text>
    </Group>
  );

  const yTicks = (
    <YTicks
      x={margins.left}
      timeToY={timeToY}
      maxY={maxY}
      yOffset={margins.top}
    />
  );

  let chartFailedWithMessage = null;
  if (!TARGET_TO_EXTRACTOR[target]) {
    chartFailedWithMessage = i18n.t('chartEmptyCases.wrongTarget', { target });
  } else if (data.length === 0) {
    chartFailedWithMessage = i18n.t('chartEmptyCases.noPeriodSelected');
  } else if (maxY === 0) {
    chartFailedWithMessage = i18n.t('chartEmptyCases.noTimeWorked');
  }

  const chart = chartFailedWithMessage ? (
    <EmptyChartMessage
      dimensions={dimensions}
      message={chartFailedWithMessage}
    />
  ) : (
    <Chart
      data={data}
      margins={margins}
      target={target}
      indexToX={indexToX}
      timeToY={timeToY}
    />
  );

  return (
    <Svg
      x={0}
      y={0}
      width="100%"
      height={svgHeight}
      style={styles.svg}
      viewBox={`0 0 ${width} ${height}`}
      onLayout={onLayoutSvg}
    >
      {chart}
      <Group>
        {xAxis}
        {xTicks}
      </Group>
      <Group>
        {yAxis}
        {yTicks}
      </Group>
      <Group>
        {yUnit}
      </Group>
      {spanSelector}
    </Svg>
  );
};

export default TimeChart;
