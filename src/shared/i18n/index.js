import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { LocaleConfig } from 'react-native-calendars';
import translations from './translations';
import './calendars';

const defaultLocale = 'en';

class I18NHandler {
  constructor() {
    this.currentLocale = null;
    this.availableLocales = Object.keys(translations);

    i18n.translations = { ...translations };
    i18n.fallbacks = true;

    this.handleLocalizationChange = this.handleLocalizationChange.bind(this);

    this.t = this.translate; // shortcut
  }

  listenLocaleChanges(callback) {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
    this.callback = callback;
  }

  setup() {
    const { languageTag } = RNLocalize.findBestAvailableLanguage(
      this.availableLocales,
    );

    const useLocale = languageTag || defaultLocale;
    i18n.locale = useLocale;
    LocaleConfig.defaultLocale = useLocale;

    const changed = this.currentLocale !== useLocale;
    this.currentLocale = useLocale;
    return changed;
  }

  handleLocalizationChange() {
    const changed = this.setup();
    if (this.callback && changed) {
      this.callback();
    }
  }

  removeListeners() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  // eslint-disable-next-line class-methods-use-this
  translate(key, options) {
    return i18n.t(key, options);
  }
}

const i18nSingleton = new I18NHandler();

export default i18nSingleton;
