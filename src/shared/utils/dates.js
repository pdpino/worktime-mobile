import moment from 'moment';
import { toMaxFixed } from './misc';

// Convention for date's names
// dateString: date as plain strings, in format YYYY-MM-DD
// date: moment object (except in WorkSession, which are strings)
// timestamp: unix timestamp
// prettyDate: date showable to the user, e.g. Today, Yesterday, 4 of September

export function getTimestamp() {
  return Date.now() / 1000;
}

export function getTimestampString() {
  return moment(Date.now()).format('YYYY/MM/DD-HH:mm:ss');
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

export function unixToDaysAgo(timestamp) {
  return daysAgo(unixToDateString(timestamp));
}

export function countWeeks(initialDate, endingDate) {
  return toMaxFixed(endingDate.diff(initialDate, 'days') / 7, 1);
}

export function prettyDate(date, useNames = true) {
  const parsedDate = moment(date, 'L');
  if (!parsedDate.isValid()) {
    return '';
  }

  const today = moment();
  const diffDays = today.startOf('day').diff(parsedDate.startOf('day'), 'days');
  const diffYears = today.year() - parsedDate.year();

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
    return parsedDate.format('ddd D MMM');
  }
  return parsedDate.format('ddd D MMM YYYY');
}

export function prettyDuration(totalSeconds, includeSeconds = false) {
  let duration = '';
  const emptyResult = includeSeconds ? '0s' : '0m';

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

export function isBetween(initialDate, endingDate, dateString) {
  const date = moment(dateString, 'L');

  if (initialDate && !endingDate) {
    return initialDate.isBefore(date, 'day');
  }
  if (!initialDate && endingDate) {
    return date.isBefore(endingDate, 'day');
  }
  if (!initialDate && !endingDate) {
    return true;
  }

  return date.isBetween(initialDate, endingDate, 'day', '[]');
}

export function isBefore(dateA, dateB) {
  return moment(dateA, 'L').isBefore(moment(dateB, 'L'), 'day');
}

export function getDateCopy(date) {
  return moment(date, 'L');
}

export function getToday() {
  return moment();
}

export function getYesterday() {
  return moment().subtract(1, 'days');
}

export function getStartOfWeek() {
  return moment().startOf('isoWeek');
}

export function getEndOfWeek() {
  return getStartOfWeek().add(6, 'days');
}

export function getStartOfMonth() {
  return moment().startOf('month');
}

export function getEndOfMonth() {
  return moment().endOf('month');
}

export function shiftMonths(date, shift) {
  // FIXME: this function is coupled with the Dashboard container
  // i.e. knows about initialDate, endingDate variables
  const shiftedDate = moment(date).add(shift, 'month');
  return {
    initialDate: moment(shiftedDate).startOf('month'),
    endingDate: moment(shiftedDate).endOf('month'),
  };
}

const semesters = [
  {
    endMonth: 7,
    start: { month: 3, day: 1 },
    end: { month: 7, day: 31 },
  },
  {
    endMonth: 12,
    start: { month: 8, day: 1 },
    end: { month: 12, day: 10 },
  },
];

function getSemesterIndex(date) {
  const month = date.month() + 1; // moment month starts at 0
  return semesters.findIndex(({ endMonth }) => month <= endMonth);
}

export function getStartOfSemester() {
  const today = moment();
  const currentMonth = today.month();
  const semesterMonth = currentMonth >= 8 ? 8 : 3;
  return moment([today.year(), semesterMonth - 1, 1]);
}

export function shiftSemesters(date, shift) {
  // shift: can only be -1 or 1
  // FIXME: this function is coupled with the Dashboard container
  const semesterIndex = getSemesterIndex(date);
  const nSemesters = semesters.length;
  let newIndex = semesterIndex + shift;
  let newYear = date.year();
  if (newIndex < 0) {
    newIndex = nSemesters + newIndex;
    newYear -= 1;
  } else if (newIndex >= nSemesters) {
    newIndex %= nSemesters;
    newYear += 1;
  }
  const newSemester = semesters[newIndex];
  return {
    initialDate: moment([
      newYear,
      newSemester.start.month - 1,
      newSemester.start.day,
    ]),
    endingDate: moment([
      newYear,
      newSemester.end.month - 1,
      newSemester.end.day,
    ]),
  };
}

export function subtractDays(date, days) {
  return moment(date).subtract(days, 'days');
}

function decidePluralLabel(singular, plural) {
  return (amount) => {
    const label = amount > 1 || amount === 0 ? plural : singular;
    return `${amount} ${label}`;
  };
}

// DICTIONARY
export const prettyDays = decidePluralLabel('day', 'days');
export const prettyWeeks = decidePluralLabel('week', 'weeks');
const prettyMonths = decidePluralLabel('month', 'months');
const prettySemesters = decidePluralLabel('semester', 'semesters');
const prettyYears = decidePluralLabel('year', 'years');

const prettySpanFunctions = {
  day: prettyDays,
  week: prettyWeeks,
  month: prettyMonths,
  semester: prettySemesters,
  year: prettyYears,
};

function daysToInterval(nDays, amount1, amount2, pretty1, pretty2) {
  const diff1 = Math.floor(nDays / amount1);
  const diff2 = Math.floor((nDays % amount1) / amount2);
  if (diff2 > 0) {
    return `${pretty1(diff1)}, ${pretty2(diff2)}`;
  }
  return pretty1(diff1);
}

export function getDiffDays(initialDate, endingDate) {
  return endingDate.diff(initialDate, 'days') + 1; // +1: inclusive limits
}

export function prettyDaysSpan(initialDate, endingDate) {
  if (!initialDate || !endingDate) {
    return 'Infinite time'; // DICTIONARY
  }

  const diffDays = getDiffDays(initialDate, endingDate);

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

export function prettyShortcutSelection(selection) {
  const { key, shifted } = selection;

  const prettySpan = prettySpanFunctions[key];
  if (!prettySpan) return 'Infinite time'; // DICTIONARY, HACK: copied

  // DICTIONARY
  if (shifted === 0) {
    return key === 'day' ? 'Today' : `This ${key}`;
  }
  if (shifted === -1) {
    return key === 'day' ? 'Yesterday' : `Last ${key}`;
  }
  if (shifted === 1) {
    return key === 'day' ? 'Tomorrow' : `Next ${key}`;
  }

  return `${prettySpan(-shifted)} ago`;
}

export function isSameDay(date1, date2) {
  return moment(date1).isSame(date2, 'days');
}

export function unixToPrettyDate(timestamp) {
  return prettyDate(moment.unix(timestamp));
}
