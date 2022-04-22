import {
  startOfDay, startOfWeek, startOfMonth, startOfYear,
  endOfDay, endOfWeek, endOfMonth, endOfYear,
  format,
  add,
} from 'date-fns';
import { isValidDate } from '../utils';

const AVAILABLE_SPANS = new Set(['days', 'weeks', 'months', 'years']);

/**
 * TODO: documentation
 * TODO: decide whether to move these date functions!
 *
 * @param {Date} date
 * @param {string} span
 * @returns
 */
const startOfSpan = (date, span) => {
  switch (span) {
    case 'days':
      return startOfDay(date);
    case 'weeks':
      return startOfWeek(date, { weekStartsOn: 1 });
    case 'months':
      return startOfMonth(date);
    case 'years':
      return startOfYear(date);
    default:
      throw Error(`Incorrect startOfSpan: ${span}`);
  }
};

/**
 *
 * @param {Date} date
 * @param {string} span
 * @returns
 */
export const endOfSpan = (date, span) => {
  switch (span) {
    case 'days':
      return endOfDay(date);
    case 'weeks':
      return endOfWeek(date, { weekStartsOn: 1 });
    case 'months':
      return endOfMonth(date);
    case 'years':
      return endOfYear(date);
    default:
      throw Error(`Incorrect endOfSpan: ${span}`);
  }
};

/**
 *
 * Assumes span is correct
 * @param {Date} date
 * @param {string} span
 * @returns
 */
const increaseBySpan = (date, span) => {
  return add(date, { [span]: 1 });
};

/**
 *
 *
 * @param {Date} date
 * @returns
 */
const getBucketStamp = (date, span) => {
  if (!isValidDate(date)) {
    console.error('INVALID BUCKET DATE: ', date, span);
    return null;
  }
  let stampDate;
  let formatter;

  switch (span) {
    case 'days':
      stampDate = startOfDay(date);
      formatter = 'y-MM-dd';
      break;
    case 'weeks':
      stampDate = startOfWeek(date, { weekStartsOn: 1 });
      formatter = 'y-[w]w';
      break;
    case 'months':
      stampDate = startOfMonth(date);
      formatter = 'y-MM';
      break;
    case 'years':
      stampDate = startOfYear(date);
      formatter = 'y';
      break;
    default:
      console.warn(`Incorrect span: ${span}`);
      return '';
  }
  return format(stampDate, formatter);
};

class Accumulator {
  constructor(date, stamp) {
    this.date = date;
    this.stamp = stamp;
    // REVIEW: customize the keys that can be retrieved??
    // use a creational pattern?
    this.timeTotal = 0;
    this.timeEffective = 0;
  }

  accumulate(workSession) {
    this.timeTotal += workSession.timeTotal;
    this.timeEffective += workSession.timeEffective;
  }

  reduce() {
    const { date, stamp, timeTotal, timeEffective } = this;
    return {
      date,
      stamp,
      // FIXME: swapping names is a mess!
      totalTime: timeTotal,
      effectiveTime: timeEffective,
    };
  }
}

const MAX_STAMPS = 20;

/**
 * Accumulate time worked by time-periods (spans).
 *
 * @param {WorkSession array} workSessions
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {string} span one of day|week|month|year
 * @returns array of { date, totalTime, effectiveTime }
 */
export const accumulateBySpan = (workSessions, startDate, endDate, span) => {
  if (workSessions.length === 0) {
    // TODO: more edge cases: endDate < startDate
    return [];
  }
  if (!AVAILABLE_SPANS.has(span)) {
    return [];
  }

  // TODO: only build the function/object once? (creational pattern?)
  const lastStamp = getBucketStamp(endDate, span);
  if (!lastStamp) {
    // endDate should not be none!
    console.log('Last stamp failed: ', endDate, span);
    return [];
  }

  // console.log('CC: ', lastStamp);
  // Build span-stamps and accumulators
  const spanStamps = [];
  const accumulatorByStamp = {};
  for (let timer = startOfSpan(startDate, span); ; timer = increaseBySpan(timer, span)) {
    if (!isValidDate(timer)) {
      console.log('INCREASE failed: ', timer);
      return [];
    }
    const stamp = getBucketStamp(timer, span);
    if (!stamp) {
      return [];
    }
    spanStamps.push(stamp);
    accumulatorByStamp[stamp] = new Accumulator(timer, stamp);

    if (stamp === lastStamp || spanStamps.length >= MAX_STAMPS) break;
  }

  workSessions.forEach((workSession) => {
    const stamp = getBucketStamp(workSession.getLocalStartDate(), span);
    if (!stamp) {
      return;
    }
    const accumulator = accumulatorByStamp[stamp];
    if (!accumulator) {
      // REVIEW: this should not happen?!
      return;
    }
    accumulator.accumulate(workSession);
  });

  return spanStamps.map((stamp) => accumulatorByStamp[stamp].reduce());
};

// export default accumulateBySpan;
