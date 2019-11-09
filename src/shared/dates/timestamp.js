import { format } from 'date-fns';
import { isNumber } from '../utils';

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

export function toLocalDate(timestamp, tzOffset) {
  if (!isNumber(timestamp) || (timestamp instanceof Date)) {
    return null;
  }
  const currentOffset = getTimezoneOffset();
  const offsetUsed = tzOffset == null ? currentOffset : tzOffset;
  const seconds = timestamp + (currentOffset - offsetUsed);
  return new Date(seconds * 1000);
}
