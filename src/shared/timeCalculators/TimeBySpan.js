import {
  startOfDay, startOfWeek, startOfMonth, startOfYear,
  endOfDay, endOfWeek, endOfMonth, endOfYear,
  format,
  add,
} from 'date-fns';
import { isValidDate } from '../utils';
import WSTimeAccumulator from './accumulator';

const AVAILABLE_SPANS = new Set(['days', 'weeks', 'months', 'years']);

/**
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
 * Returns the end of the span of type <span> containing <date>
 *
 * @param {Date} date
 * @param {string} span
 * @returns Date object
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
const increaseBySpan = (date, span) => add(date, { [span]: 1 });

/**
 *
 *
 * @param {Date} date
 * @returns
 */
const getBucketStamp = (date, span) => {
  if (!isValidDate(date)) {
    // console.error('INVALID BUCKET DATE: ', date, span);
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
      // console.warn(`Incorrect span: ${span}`);
      return '';
  }
  return format(stampDate, formatter);
};

const MAX_STAMPS = 1000; // Avoid infinite-loops

/**
 * Accumulate time worked by time-spans.
 *
 * Each session in the period startDate and endDate is placed into a bucket,
 * representing a span of time (e.g. a month). Times worked are accumulated
 * (timeTotal, timeEffective).
 *
 * @param {WorkSession array} workSessions
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {string} span one of day|week|month|year
 * @returns array of { date, timeTotal, timeEffective }
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
    // console.error('lastStamp wrong: ', endDate, span);
    return [];
  }

  // Build span-stamps and accumulators
  const spanStamps = [];
  const accumulatorByStamp = {};
  for (let timer = startOfSpan(startDate, span); ; timer = increaseBySpan(timer, span)) {
    const stamp = getBucketStamp(timer, span);
    if (!stamp) {
      // console.error('increase timer failed: ', timer, span);
      return [];
    }
    spanStamps.push(stamp);
    accumulatorByStamp[stamp] = new WSTimeAccumulator({ date: timer, stamp });

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
