import moment from 'moment';

export function getTimestamp() {
  return Date.now() / 1000;
}

export function unixToDate(timestamp) {
  const date = moment.unix(timestamp);
  return date.format('L');
}

export function unixToHour(timestamp) {
  const date = moment.unix(timestamp);
  return date.format('HH:mm');
}

export function daysAgo(date) {
  // REVIEW: delete this function if is not used
  const parsedDate = moment(date, 'L');
  if (!parsedDate.isValid()) {
    return 0;
  }

  const diffDays = moment().diff(parsedDate, 'days');

  // DICTIONARY
  if (diffDays === 0) {
    return 'Today';
  } if (diffDays === 1) {
    return 'Yesterday';
  }
  return `${diffDays} days ago`;
}

export function prettyDate(date) {
  const parsedDate = moment(date, 'L');
  if (!parsedDate.isValid()) {
    return '';
  }

  const today = moment();
  const diffDays = today.diff(parsedDate, 'days');
  const diffYears = today.year() - parsedDate.year();

  // DICTIONARY
  if (diffDays === 0) {
    return 'Today';
  } if (diffDays === 1) {
    return 'Yesterday';
  } if (diffYears === 0) {
    return parsedDate.format('dddd DD MMMM');
  }
  return parsedDate.format('dddd DD MMMM YYYY');
}

export function prettyDuration(totalSeconds) {
  if (!totalSeconds) {
    return '0s';
  }

  const seconds = Math.floor(totalSeconds) % 60;
  let duration = `${seconds}s`;

  let minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  if (minutes) {
    duration = `${minutes}m ${duration}`;
  }

  if (hours) {
    duration = `${hours}h ${duration}`;
  }

  return duration;
}
