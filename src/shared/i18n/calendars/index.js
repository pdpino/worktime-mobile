import { LocaleConfig } from 'react-native-calendars';
import es from './es';

LocaleConfig.locales.es = es;
LocaleConfig.locales.en = LocaleConfig.locales[''];

const setRNCalendarsLocale = (locale) => {
  LocaleConfig.defaultLocale = locale;
};

export default setRNCalendarsLocale;
