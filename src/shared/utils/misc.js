// eslint-disable-next-line import/prefer-default-export
export function smartDivision(divide, by, percentage = false, decimals = 1) {
  const perc = percentage ? 100 : 1;
  return by !== 0 ? (divide / by * perc).toFixed(decimals) : 0;
}
