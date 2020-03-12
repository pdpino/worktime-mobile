import * as RNLocalize from 'react-native-localize';

const originalFindBestAvailableLanguage = RNLocalize.findBestAvailableLanguage;

const mockBestLocale = (languageTag) => {
  RNLocalize.findBestAvailableLanguage = () => ({
    languageTag,
    isRTL: false,
  });
};

const restoreMock = () => {
  RNLocalize.findBestAvailableLanguage = originalFindBestAvailableLanguage;
};

export {
  mockBestLocale,
  restoreMock,
};
