import { Alert } from 'react-native';

const productionErrorHandler = (error, isFatal) => {
  /* eslint-disable no-console */
  console.log(`Caught JS error: (${isFatal ? 'fatal' : 'non-fatal'})`);
  console.log(error);
  /* eslint-enable no-console */

  Alert.alert(
    'Error', // DICTIONARY
    error.message,
    [{ text: 'OK' }],
  );
};

// eslint-disable-next-line no-underscore-dangle
if (!global.__DEV__) {
  global.ErrorUtils.setGlobalHandler(productionErrorHandler);
}
