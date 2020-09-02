import { isValid } from 'date-fns';

/**
 * Returns true if value is of type number or a number as a string.
 */
export function isNumber(value) {
  if (value == null) return false;

  // avoid dates
  const t = typeof value;
  if (t !== 'number' && t !== 'string') return false;

  const parsedValue = Number(value);
  return (parsedValue || parsedValue === 0);
}

/**
 * Returns true if value is a valid date instance.
 *
 * A date as a string or a timestamp (number) will return false.
 */
export function isValidDate(value) {
  return (typeof value === 'object') && isValid(value);
  // NOTEs:
  // * Something like: `value instanceof Date` could be used,
  //   but `global.Date` is mocked in tests, and this may evaluate to false
  // * date-fns' `isValid` function returns true for a number
}
