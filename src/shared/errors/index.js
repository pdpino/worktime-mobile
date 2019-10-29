import { Alert } from 'react-native';

global.ErrorUtils.setGlobalHandler((error, isFatal) => {
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
