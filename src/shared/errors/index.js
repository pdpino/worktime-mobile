import { Alert } from 'react-native';

// eslint-disable-next-line no-underscore-dangle
const isDev = global.__DEV__;

const defaultHandler = global.ErrorUtils.getGlobalHandler();
global.ErrorUtils.setGlobalHandler((error, isFatal) => {
  if (isDev) {
    defaultHandler(error, isFatal);
    return;
  }

  /* eslint-disable no-console */
  console.log(`Caught JS error: (${isFatal ? 'fatal' : 'non-fatal'})`);
  console.log(error);
  /* eslint-enable no-console */

  Alert.alert(
    'Error', // DICTIONARY
    error.message,
    [{ text: 'OK' }],
  );
});
