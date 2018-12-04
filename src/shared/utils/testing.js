/*
 * Use cpu for some time doing nothing
 * Dummy function used for testing
 */
export function pauseFor(millis) { // eslint-disable-line import/prefer-default-export
  const date = Date.now();
  let curDate;
  do {
    curDate = Date.now();
  } while (curDate - date < millis);
}
