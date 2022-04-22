import {
  format, formatDistanceStrict, differenceInCalendarDays,
} from 'date-fns';
import { isNumber, isValidDate } from '../utils';
import i18n from '../i18n';
import { toLocalDate, getTimezoneOffset, _sanitizeTimestampOrDate } from './timestamp';
import getCurrentLocale from './locales';

export function prettyDate(date, useNames = true) {
  if (!isValidDate(date)) {
    return '';
  }

  const dateYear = date.getFullYear();
  const today = new Date();
  const diffDays = differenceInCalendarDays(today, date);
  const diffYears = today.getFullYear() - dateYear;

  if (useNames) {
    if (diffDays === 0) {
      return i18n.t('dates.today');
    } if (diffDays === 1) {
      return i18n.t('dates.yesterday');
    } if (diffDays === -1) {
      return i18n.t('dates.tomorrow');
    }
  }

  const locale = getCurrentLocale(i18n.currentLocale);
  const config = { locale };

  if (diffYears === 0) {
    return format(date, 'E d MMM', config);
  }
  return format(date, 'E d MMM yyyy', config);
}

export function timeToPrettyDate(timestamp, tzOffset, useNames = true) {
  if (!isNumber(timestamp)) {
    return '';
  }
  const date = toLocalDate(timestamp, tzOffset);
  return prettyDate(date, useNames);
}

export function prettyHour(timestampOrDate, tzOffset) {
  const date = isValidDate(timestampOrDate)
    ? timestampOrDate
    : toLocalDate(timestampOrDate, tzOffset);
  return date ? format(date, 'HH:mm') : '';
}

export function prettyDaysAgo(timestampOrDate, options = {}) {
  const date = _sanitizeTimestampOrDate(timestampOrDate);

  return (date != null) ? formatDistanceStrict(date, new Date(), {
    unit: 'day',
    roundingMethod: 'ceil',
    ...options,
  }) : i18n.t('never');
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

export function prettyTimespanDuration(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  return prettyDuration((endTimestamp - startTimestamp) / 1000);
}

export function dateToDateString(date) {
  return isValidDate(date) && format(date, 'yyyy-MM-dd');
}

export function prettyTimezoneOffset(tzOffset) {
  const offsetUsed = tzOffset != null ? tzOffset : getTimezoneOffset();
  const offsetHours = offsetUsed / 3600;
  if (offsetUsed === 0) return 'UTC';
  if (offsetUsed > 0) return `+${offsetHours}`;

  return offsetHours.toString();
}

export function prettyTimezone(tzOffset, tzName) {
  const prettyOffset = prettyTimezoneOffset(tzOffset);
  if (tzName != null) {
    return `${tzName} (${prettyOffset})`;
  }
  return `GMT ${prettyOffset}`;
}
