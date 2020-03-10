import en from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';

const locales = {
  en,
  es,
};

export default function getCurrentLocale(key) {
  return locales[key] || locales.en;
}
