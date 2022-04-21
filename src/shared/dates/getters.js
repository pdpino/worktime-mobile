import {
  startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  subWeeks,
} from 'date-fns';

export function getDateCopy(date) {
  return new Date(date.getTime());
}

export function getDate(year, month, day) {
  const monthIndex = month - 1;
  return new Date(year, monthIndex, day);
}

export function getToday() {
  return new Date();
}

export function getStartOfDay(date) {
  return date && startOfDay(date);
}

export function getEndOfDay(date) {
  return date && endOfDay(date);
}

export function getStartOfWeek(date = null) {
  return startOfWeek((date || new Date()), {
    weekStartsOn: 1,
  });
}

export function getEndOfWeek() {
  return endOfWeek(new Date(), {
    weekStartsOn: 1,
  });
}

export function getStartOfMonth() {
  return startOfMonth(new Date());
}

export function getEndOfMonth() {
  return endOfMonth(new Date());
}

export function getNWeeksBefore(nWeeks, date = null) {
  return subWeeks(getStartOfWeek(date), nWeeks);
}
