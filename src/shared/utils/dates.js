import moment from 'moment';

export function getTimestamp() {
  return Date.now() / 1000;
}

export function getDate(timestamp) {
  const date = moment.unix(timestamp);
  return date.format('L');
}

export function getHour(timestamp) {
  const date = moment.unix(timestamp);
  return date.format('LTS');
}
