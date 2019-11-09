import {
  addMonths, subDays, isWithinInterval, differenceInDays,
  startOfMonth, endOfMonth, isBefore,
} from 'date-fns';
import { toMaxFixed, isValidDate } from '../../utils';

function decidePluralLabel(singular, plural) {
  return (amount) => {
    const label = amount > 1 || amount === 0 ? plural : singular;
    return `${amount} ${label}`;
  };
}

// DICTIONARY
export const prettyDays = decidePluralLabel('day', 'days');
export const prettyWeeks = decidePluralLabel('week', 'weeks');
const prettyMonths = decidePluralLabel('month', 'months');
const prettySemesters = decidePluralLabel('semester', 'semesters');
const prettyYears = decidePluralLabel('year', 'years');

export const prettySpanFunctions = {
  day: prettyDays,
  week: prettyWeeks,
  month: prettyMonths,
  semester: prettySemesters,
  year: prettyYears,
};

export function getDiffDays(initialDate, endingDate) {
  return differenceInDays(endingDate, initialDate) + 1; // +1: inclusive limits
}

function daysToInterval(nDays, amount1, amount2, pretty1, pretty2) {
  const diff1 = Math.floor(nDays / amount1);
  const diff2 = Math.floor((nDays % amount1) / amount2);
  if (diff2 > 0) {
    return `${pretty1(diff1)}, ${pretty2(diff2)}`;
  }
  return pretty1(diff1);
}

export function prettyDaysSpan(initialDate, endingDate) {
  if (!initialDate || !endingDate) {
    return 'Infinite time'; // DICTIONARY
  }

  const diffDays = getDiffDays(initialDate, endingDate);

  // DICTIONARY
  if (diffDays < 7) {
    return prettyDays(diffDays);
  } if (diffDays < 30) {
    return daysToInterval(diffDays, 7, 1, prettyWeeks, prettyDays);
  } if (diffDays < 365) {
    return daysToInterval(diffDays, 30, 7, prettyMonths, prettyWeeks);
  }
  return daysToInterval(diffDays, 365, 30, prettyYears, prettyWeeks);
}

export function isBetween(start, end, date) {
  const isStartValid = isValidDate(start);
  const isEndValid = isValidDate(end);
  if (!isValidDate(date)) return false;
  if (!isStartValid && !isEndValid) return true;
  if (isStartValid && !isEndValid) return isBefore(start, date);
  if (!isStartValid && isEndValid) return isBefore(date, end);

  return isWithinInterval(date, { start, end });
}

export function shiftMonths(date, shift) {
  // FIXME: this function is coupled with the Dashboard container
  // i.e. knows about initialDate, endingDate variables
  const shiftedDate = addMonths(date, shift);
  return {
    initialDate: startOfMonth(shiftedDate),
    endingDate: endOfMonth(shiftedDate),
  };
}

export function subtractDays(date, days) {
  return subDays(date, days);
}

export function countWeeks(initialDate, endingDate) {
  return toMaxFixed(differenceInDays(initialDate, endingDate) / 7, 1);
}

export {
  isBefore,
};
