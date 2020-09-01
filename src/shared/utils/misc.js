import unorm from 'unorm';
import memoizeOne from 'memoize-one';

export function smartDivision(divide, by, percentage = false, decimals = 1) {
  const perc = percentage ? 100 : 1;
  return by !== 0 ? ((divide / by) * perc).toFixed(decimals) : 0;
}

export function prettyPercentage(value, divider) {
  const percentage = divider ? smartDivision(value, divider, true, 0) : value.toFixed(0);
  return `${percentage}%`;
}

export function toMaxFixed(number, decimals) {
  const roundedNumber = number.toFixed(decimals);
  const hasDecimals = roundedNumber % 1 !== 0;
  const numberStr = hasDecimals ? roundedNumber : number.toFixed(0);
  return parseFloat(numberStr);
}

export function makeFunctionAsync(func) {
  // REVIEW: usage of setTimeout to make something async, is it too hacky?
  return (...params) => new Promise((resolve) => {
    setTimeout(() => resolve(func(...params)), 0);
  });
}

export function extractFilename(filePath) {
  const splitted = filePath.split('/');
  return splitted[splitted.length - 1];
}

export const sortByName = memoizeOne((array) => {
  const getName = (elem) => (elem && elem.name && elem.name.toLowerCase()) || '';
  return array ? array.sort(
    (elem1, elem2) => (getName(elem1) <= getName(elem2) ? -1 : 1),
  ) : [];
});

export function removeStrAccents(str) {
  return unorm.nfd(str).replace(/[\u0300-\u036f]/g, '');
}
