import {
  addMonths, subDays, isWithinInterval, differenceInCalendarDays,
  startOfMonth, endOfMonth, isBefore,
} from 'date-fns';
import i18n from '../../i18n';
import { toMaxFixed, isValidDate } from '../../utils';

const getDictFunction = key => count => i18n.t(`datePeriods.${key}`, { count });
export const prettyDays = getDictFunction('day');
export const prettyWeeks = getDictFunction('week');
const prettyMonths = getDictFunction('month');
const prettySemesters = getDictFunction('semester');
const prettyYears = getDictFunction('year');

export const prettySpanFunctions = {
  day: prettyDays,
  week: prettyWeeks,
  month: prettyMonths,
  semester: prettySemesters,
  year: prettyYears,
};

/**
 * Returns the amount of days between two dates, with inclusive limits.
 */
export function getDaysInclusiveDiff(initialDate, endingDate) {
  return differenceInCalendarDays(endingDate, initialDate) + 1;
}

/**
 * Returns the amount of weeks (can be half a week) between two dates.
 */
export function getWeeksDiff(initialDate, endingDate) {
  return toMaxFixed(differenceInCalendarDays(endingDate, initialDate) / 7, 1);
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
    return i18n.t('datePeriods.infinite');
  }

  const diffDays = getDaysInclusiveDiff(initialDate, endingDate);

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

export {
  isBefore,
};
