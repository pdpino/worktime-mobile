import { addLocale, setLocale } from 'react-native-week-view/src/utils';
import es from '../calendars/es';

const spanishConfig = {
  months: es.monthNames,
  monthsShort: es.monthNamesShort,
  weekdays: es.dayNames,
  weekdaysShort: es.dayNamesShort,
};
addLocale('es', spanishConfig);

const setRNWeekViewLocale = (locale) => {
  setLocale(locale);
};

export default setRNWeekViewLocale;
