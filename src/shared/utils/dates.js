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

function decidePluralLabel(singular, plural) {
  return (amount) => {
    const label = amount > 1 || amount === 0 ? plural : singular;
    return `${amount} ${label}`;
  };
}

// DICTIONARY
export const prettyDays = decidePluralLabel('day', 'days');
const prettyWeeks = decidePluralLabel('week', 'weeks');
const prettyMonths = decidePluralLabel('month', 'months');
const prettyYears = decidePluralLabel('year', 'years');

function daysToInterval(nDays, amount1, amount2, pretty1, pretty2) {
  const diff1 = Math.floor(nDays / amount1);
  const diff2 = Math.floor((nDays % amount1) / amount2);
  if (diff2 > 0) {
    return `${pretty1(diff1)}, ${pretty2(diff2)}`;
  }
  return pretty1(diff1);
}

export function prettyDaysSpan(initialDate, endingDate) {
  const diffDays = endingDate.diff(initialDate, 'days') + 1; // +1: inclusive limits

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
