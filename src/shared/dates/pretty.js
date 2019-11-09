import {
  format, formatDistanceStrict, differenceInDays,
} from 'date-fns';
import { toLocalDate } from './timestamp';
import { isNumber, isValidDate } from '../utils';

export function prettyDate(date, useNames = true) {
  const dateYear = date && date.getFullYear && date.getFullYear();
  if (!dateYear) {
    return '';
  }

  const today = new Date();
  const diffDays = differenceInDays(date, today);
  const diffYears = today.getFullYear() - dateYear;

  // DICTIONARY
  if (useNames) {
    if (diffDays === 0) {
      return 'Today';
    } if (diffDays === 1) {
      return 'Yesterday';
    } if (diffDays === -1) {
      return 'Tomorrow';
    }
  }

  if (diffYears === 0) {
    return format(date, 'E d MMM');
  }
  return format(date, 'E d MMM yyyy');
}

export function timeToPrettyDate(timestamp, tzOffset, useNames = true) {
  const date = toLocalDate(timestamp, tzOffset);
  return prettyDate(date, useNames);
}

export function prettyHour(timestamp, tzOffset) {
  const date = toLocalDate(timestamp, tzOffset);
  return date ? format(date, 'HH:mm') : '';
}

export function prettyDaysAgo(timestamp) {
  const date = toLocalDate(timestamp);
  if (!date) {
    return 'Never'; // DICTIONARY
  }
  return formatDistanceStrict(date, new Date(), {
    unit: 'day',
    roundingMethod: 'ceil',
  });
}

export function prettyDuration(totalSeconds, includeSeconds = false) {
  let duration = '';
  const emptyResult = includeSeconds ? '0s' : '0m';
  if (!isNumber(totalSeconds) || totalSeconds <= 0) {
    return emptyResult;
  }

  const seconds = Math.floor(totalSeconds % 60);
  let minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  if (includeSeconds && seconds) {
    duration = `${seconds}s`;
  }

  if (minutes) {
    duration = `${minutes}m ${duration}`;
  }

  if (hours) {
    duration = `${hours}h ${duration}`;
  }

  return duration ? duration.trim() : emptyResult;
}

export function dateToDateString(date) {
  return isValidDate(date) && format(date, 'yyyy-MM-dd');
}
