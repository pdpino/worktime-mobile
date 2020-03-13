import * as RNLocalize from 'react-native-localize';

const mockBestLocale = (languageTag) => {
  RNLocalize.findBestAvailableLanguage.mockReturnValue({
    languageTag,
    isRTL: false,
  });
};

export {
  mockBestLocale, // eslint-disable-line import/prefer-default-export
};
