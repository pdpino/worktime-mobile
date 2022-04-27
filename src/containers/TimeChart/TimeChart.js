import React from 'react';
import {
  Svg, Path, Text, G as Group, Rect,
} from 'react-native-svg';
import {
  format, getYear, add, endOfYear, isBefore,
} from 'date-fns';
import styles from './styles';
import i18n from '../../shared/i18n';
import { colors, timeColors } from '../../shared/styles';
import { isNumber } from '../../shared/utils';
import { prettyDuration, differenceBySpan } from '../../shared/dates';
import { useChartDimensions, useHeightPercentage } from './useDimensions';

// // dummy debug data
// const DUMMY_DATA = [
//   {
//     date: new Date(2022, 3, 17),
//     timeTotal: 3,
//     timeEffective: 2.5,
//   },
//   {
//     date: new Date(2022, 3, 18),
//     timeTotal: 0,
//     timeEffective: 0,
//   },
//   {
//     date: new Date(2022, 3, 19),
//     timeTotal: 0,
//     timeEffective: 0,
//   },
//   {
//     date: new Date(2022, 3, 20),
//     timeTotal: 7,
//     timeEffective: 5,
//   },
//   {
//     date: new Date(2022, 3, 21),
//     timeTotal: 3,
//     timeEffective: 1,
//   },
//   {
//     date: new Date(2022, 3, 22),
//     timeTotal: 5,
//     timeEffective: 4,
//   },
// ];

const AXIS_COLOR = 'black';
const YEAR_COLOR = colors.darkGray;
const TICK_SIZE = 5;
const MAX_TICKS = 4;

const SPAN_BUTTON_HEIGHT = 24;

const TARGET_TO_EXTRACTOR = {
  total: (x) => x.timeTotal,
  effective: (x) => x.timeEffective,
  paused: (x) => x.timeTotal - x.timeEffective,
};

const formatXTick = (date, timeSpan) => {
  // TODO: improve this function further? calculate format only once?
  // ticks may overlap!
  switch (timeSpan) {
    case 'years':
      return format(date, 'y');
    case 'months':
      return format(date, 'MMM');
    case 'weeks':
    case 'days':
      return format(date, 'dd MMM');
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
        {`${prettyDuration(yValue, { truncate: true })}`}
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

const FilledPath = ({
  chartDimensions, margins, data, target, indexToX, timeToY, color,
}) => {
  const valueExtractor = TARGET_TO_EXTRACTOR[target];

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

  // Close the path
  path.push(...[
    'L', indexToX(data.length - 1), timeToY(0), // To xAxis
    'L', indexToX(0), timeToY(0), // To origin
  ]);

  const { height: chartHeight, width: chartWidth } = chartDimensions;

  return (
    <Group x={margins.left} y={margins.top} preserveAspectRatio="none">
      <Rect height={chartHeight} width={chartWidth} fill={colors.evenLighterGray} />
      <Path d={path.join(' ')} fill={color} />
    </Group>
  );
};

const YearMarks = ({
  data, margins, timeSpan, indexToX, chartDimensions,
}) => {
  const yearLines = [];
  if (timeSpan !== 'years' && data.length >= 2) {
    const startDate = data[0].date;
    const endDate = data[data.length - 1].date;
    const deltaYears = getYear(endDate) - getYear(startDate);
    if (deltaYears === 0) {
      yearLines.push({
        index: data.length / 2,
        yearLeft: getYear(startDate),
        hideLine: true,
        hideRight: true,
      });
    } else if (deltaYears > 0) {
      const slope = differenceBySpan(endDate, startDate, timeSpan);
      for (
        let timer = endOfYear(startDate);
        isBefore(timer, endDate);
        timer = add(timer, { years: 1 })
      ) {
        const index = (differenceBySpan(timer, startDate, timeSpan) / slope) * data.length;
        yearLines.push({
          index,
          yearLeft: getYear(timer),
        });
        if (yearLines.length >= 10) {
          // error, avoid infinite loop
          break;
        }
      }
    }
  }

  const { height: chartHeight } = chartDimensions;

  return yearLines.map(({
    index, yearLeft, hideLine, hideRight,
  }) => {
    const x = margins.left + indexToX(index);
    const y = margins.top + chartHeight + margins.bottom;
    const path = `M ${x} ${margins.top + chartHeight} V ${y}`;
    const textY = y - 8;
    return (
      <Group key={yearLeft}>
        {!hideLine && <Path d={path} stroke={YEAR_COLOR} strokeDasharray="5,5" />}
        <Text
          x={x - 5}
          y={textY}
          fill={YEAR_COLOR}
          textAnchor={hideRight ? 'middle' : 'end'}
          alignmentBaseline="bottom"
        >
          {yearLeft}
        </Text>
        {!hideRight && (
          <Text
            x={x + 5}
            y={textY}
            fill={YEAR_COLOR}
            textAnchor="start"
            alignmentBaseline="bottom"
          >
            {yearLeft + 1}
          </Text>
        )}
      </Group>
    );
  });
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
  const maxY = Math.max(...data.map((d) => d.timeTotal));
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
      {i18n.t('hoursAbrev')}
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
      onPress={circleThroughSpans}
    >
      <Rect
        width={48}
        height={SPAN_BUTTON_HEIGHT}
        y={-SPAN_BUTTON_HEIGHT / 2}
        fill={colors.lightBlue}
        strokeWidth={1}
        stroke="black"
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

  const targetIsValid = !!TARGET_TO_EXTRACTOR[target];

  let chartFailedWithMessage = null;
  if (!targetIsValid) {
    chartFailedWithMessage = i18n.t('chartEmptyCases.wrongTarget', { target });
  } else if (data.length === 0) {
    chartFailedWithMessage = i18n.t('chartEmptyCases.noPeriodSelected');
  } else if (maxY === 0) {
    chartFailedWithMessage = i18n.t('chartEmptyCases.noTimeWorked');
  }

  const color = timeColors[target];

  const chart = chartFailedWithMessage ? (
    <EmptyChartMessage
      dimensions={dimensions}
      message={chartFailedWithMessage}
    />
  ) : (
    <FilledPath
      data={data}
      chartDimensions={chartDimensions}
      margins={margins}
      target={target}
      indexToX={indexToX}
      timeToY={timeToY}
      color={color}
    />
  );

  const label = targetIsValid && (
    <Text
      x={width - margins.right}
      y={margins.top}
      textAnchor="start"
      fill={color}
      fontSize={15}
    >
      {i18n.t(`chartLegend.${target}`)}
    </Text>
  );

  const yearMarks = (
    <YearMarks
      data={data}
      margins={margins}
      timeSpan={timeSpan}
      indexToX={indexToX}
      chartDimensions={chartDimensions}
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
      {label}
      {yearMarks}
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
