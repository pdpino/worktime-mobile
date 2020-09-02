import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
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

export function toLocalDate(timestampOrDate, tzName) {
  const isTimestamp = isNumber(timestampOrDate);
  if (!isTimestamp && !isValidDate(timestampOrDate)) {
    return null;
  }
  const tzNameUsed = tzName || getTimezoneName();
  const timeOrDateUsed = isTimestamp
    ? timestampOrDate * 1000
    : timestampOrDate;
  return utcToZonedTime(timeOrDateUsed, tzNameUsed);
}
