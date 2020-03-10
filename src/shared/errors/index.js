import { Alert } from 'react-native';
import i18n from '../i18n';

const productionErrorHandler = (error, isFatal) => {
  /* eslint-disable no-console */
  console.log(`Caught JS error: (${isFatal ? 'fatal' : 'non-fatal'})`);
  console.log(error);
  /* eslint-enable no-console */

  Alert.alert(
    i18n.t('error'),
    error.message,
    [{ text: 'OK' }],
  );
};

// eslint-disable-next-line no-underscore-dangle
if (!global.__DEV__) {
  global.ErrorUtils.setGlobalHandler(productionErrorHandler);
}
