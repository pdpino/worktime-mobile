export function smartDivision(divide, by, percentage = false, decimals = 1) {
  const perc = percentage ? 100 : 1;
  return by !== 0 ? (divide / by * perc).toFixed(decimals) : 0;
}

export function prettyPercentage(value, divider) {
  const percentage = divider ? smartDivision(value, divider, true, 0) : value.toFixed(0);
  return `${percentage}%`;
}
