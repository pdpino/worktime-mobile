import { isSameDay } from 'date-fns';

export * from './getters';
export * from './intervals';
export * from './pretty';
export * from './semesters';
export * from './timestamp';

export {
  isSameDay,
};

/**
 * Variable names convention:
 *   date: native Date object
 *   dateString: date as string with fixed format YYYY-MM-dd
 *   timestamp: unix timestamp, in seconds
 *   tzOffset: Timezone offset, in seconds
 *   prettyDate: Date showable to the user, e.g. Today, Yesterday, September 4
 */
