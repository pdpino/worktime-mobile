/*
 * Use cpu for some time doing nothing
 * Dummy function used for testing
 */
export function waitSync(millis) {
  const start = Date.now();
  let current;
  do {
    current = Date.now();
  } while (current - start < millis);
}

export function waitAsync(millis) {
  return new Promise(resolve => setTimeout(() => resolve(), millis));
}
