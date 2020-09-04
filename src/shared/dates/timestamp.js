import { format } from 'date-fns';
import subSeconds from 'date-fns/subSeconds';
import * as RNLocalize from 'react-native-localize';
import { isNumber, isValidDate } from '../utils';

export function getTimezoneName() {
  return RNLocalize.getTimeZone();
}

export function getTimezoneOffset() {
  // in seconds
  return (new Date()).getTimezoneOffset() * 60;
}

export function getTimestamp() {
  // in seconds
  return Date.now() / 1000;
}

export function getTimestampString() {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export function toLocalDate(timestampOrDate, tzOffset) {
  const isTimestamp = isNumber(timestampOrDate);
  if (!isTimestamp && !isValidDate(timestampOrDate)) {
    return null;
  }
  const date = isTimestamp
    ? new Date(timestampOrDate * 1000)
    : timestampOrDate;

  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );

  const tzOffsetUsed = (tzOffset != null) ? tzOffset : getTimezoneOffset();

  return subSeconds(utcDate, tzOffsetUsed);
}
