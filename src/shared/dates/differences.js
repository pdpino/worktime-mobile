import {
  differenceInHours, differenceInCalendarDays,
} from 'date-fns';

// Difference in floats

// eslint-disable-next-line import/prefer-default-export
export const differenceBySpan = (leftDate, rightDate, timeSpan) => {
  switch (timeSpan) {
    case 'days':
      return differenceInHours(leftDate, rightDate) / 24;
    case 'weeks':
      return differenceInCalendarDays(leftDate, rightDate) / 7;
    case 'months':
      return differenceInCalendarDays(leftDate, rightDate) / 30; // approx
    case 'years':
      return differenceInCalendarDays(leftDate, rightDate) / 365;
    default:
      return 0;
  }
};

// // NOTE: is slightly different from function getWeeksDiff()
// // good idea to simplify them
