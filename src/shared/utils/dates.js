import moment from 'moment';

// Convention for date's names
// dateString: date as plain strings, in format YYYY-MM-DD
// date: moment object (except in WorkSession, which are strings)
// timestamp: unix timestamp
// prettyDate: date showable to the user, e.g. Today, Yesterday, 4 of September

export function getTimestamp() {
  return Date.now() / 1000;
}

export function unixToDateString(timestamp) {
  const date = moment.unix(timestamp);
  return date.format('L');
}

export function unixToHour(timestamp) {
  const date = moment.unix(timestamp);
  return date.format('HH:mm');
}

export function daysAgo(date) {
  const parsedDate = moment(date, 'L');
  if (!parsedDate.isValid()) {
    return 'Never'; // DICTIONARY
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
    return parsedDate.format('ddd D MMM');
  }
  return parsedDate.format('ddd D MMM YYYY');
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

export function isBetween(initialDate, endingDate, dateString) {
  return moment(dateString, 'L').isBetween(initialDate, endingDate, 'day', '[]');
}
