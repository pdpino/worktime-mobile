export function smartDivision(divide, by, percentage = false, decimals = 1) {
  const perc = percentage ? 100 : 1;
  return by !== 0 ? (divide / by * perc).toFixed(decimals) : 0;
}

export function prettyPercentage(value, divider) {
  const percentage = divider ? smartDivision(value, divider, true, 0) : value.toFixed(0);
  return `${percentage}%`;
}

export function toMaxFixed(number, decimals) {
  const roundedNumber = number.toFixed(decimals);
  const hasDecimals = roundedNumber % 1 === 0;
  return hasDecimals ? roundedNumber : number.toFixed(0);
}

export function makeFunctionAsync(func) {
  // REVIEW: usage of setTimeout to make something async, is it too hacky?
  return (...params) => new Promise((resolve) => {
    setTimeout(() => resolve(func(...params)), 0);
  });
}
