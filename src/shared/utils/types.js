import { isValid } from 'date-fns';

/**
 * Returns true if value is of type number or a number as a string.
 */
export function isNumber(value) {
  const parsedValue = Number(value);
  const isDate = value instanceof Date;
  return value != null && !isDate && (parsedValue || parsedValue === 0);
}

/**
 * Returns true if value is a valid date instance.
 *
 * A date as a string will return false.
 */
export function isValidDate(value) {
  return value instanceof Date && isValid(value);
}
