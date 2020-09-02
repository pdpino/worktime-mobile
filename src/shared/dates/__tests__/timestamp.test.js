import mockTimezone from 'timezone-mock';
import { toLocalDate } from '../timestamp';

const createTests = {
  baseOffset: () => [
    {
      timestamp: 1572816420,
      offset: 10800,
      tzName: 'America/Santiago',
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 18,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1573159271,
      offset: 10800,
      tzName: 'America/Santiago',
      outcome: {
        year: 2019,
        month: 11,
        day: 7,
        hours: 17,
        minutes: 41,
        seconds: 11,
      },
    },
  ],
  positiveOffset: () => [
    {
      timestamp: 1572816420,
      offset: 5 * 3600,
      tzName: 'America/New_York',
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 16,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1572816420,
      offset: 8 * 3600,
      tzName: 'America/Los_Angeles',
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 13,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1573159271,
      offset: 8 * 3600,
      tzName: 'America/Los_Angeles',
      outcome: {
        year: 2019,
        month: 11,
        day: 7,
        hours: 12,
        minutes: 41,
        seconds: 11,
      },
    },
  ],
  negativeOffset: () => [
    {
      timestamp: 1572816420,
      offset: -1 * 3600,
      tzName: 'Europe/Madrid',
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 22,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1572816420,
      offset: -2 * 3600,
      tzName: 'Europe/Kiev',
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 23,
        minutes: 27,
        seconds: 0,
      },
    },
  ],
  nearZero: () => [
    {
      timestamp: 0,
      offset: -1 * 3600,
      tzName: 'Europe/London',
      outcome: {
        year: 1970,
        month: 1,
        day: 1,
        hours: 1,
        minutes: 0,
        seconds: 0,
      },
    },
    {
      timestamp: 0,
      offset: -3 * 3600,
      tzName: 'Europe/Moscow',
      outcome: {
        year: 1970,
        month: 1,
        day: 1,
        hours: 3,
        minutes: 0,
        seconds: 0,
      },
    },
    {
      timestamp: 0,
      offset: 3 * 3600,
      tzName: 'America/Santiago',
      outcome: {
        year: 1969,
        month: 12,
        day: 31,
        hours: 21,
        minutes: 0,
        seconds: 0,
      },
    },
  ],
};

describe('toLocalDate', () => {
  describe('Input handling', () => {
    it('Returns a date on empty timezone name', () => {
      expect(toLocalDate(0)).toBeValidDate();
      expect(toLocalDate(1000, null)).toBeValidDate();
      expect(toLocalDate(new Date())).toBeValidDate();
    });

    it('Returns null on empty timestamp or date', () => {
      expect(toLocalDate()).toBeNull();
      expect(toLocalDate(null)).toBeNull();
      expect(toLocalDate(null, 'America/Santiago')).toBeNull();
    });

    it('Returns null on invalid timestamp', () => {
      expect(toLocalDate('hello')).toBeNull();
      expect(toLocalDate('world', 'Europe/London')).toBeNull();
    });
  });

  describe('Calculates date correctly from the timezone', () => {
    const runTestsCases = (cases) => cases.forEach((testCase) => {
      const {
        timestamp, tzName, outcome,
      } = testCase;
      const date = toLocalDate(timestamp, tzName);

      expect(date.getFullYear()).toEqual(outcome.year);
      expect(date.getMonth()).toEqual(outcome.month - 1);
      expect(date.getDate()).toEqual(outcome.day);
      expect(date.getMinutes()).toEqual(outcome.minutes);
      expect(date.getSeconds()).toEqual(outcome.seconds);
      expect(date.getHours()).toEqual(outcome.hours);
    });

    const runCasesWithTimezone = (timezone) => {
      if (timezone) {
        mockTimezone.register(timezone);
      }
      runTestsCases(createTests.baseOffset());
      runTestsCases(createTests.positiveOffset());
      runTestsCases(createTests.negativeOffset());
      runTestsCases(createTests.nearZero());
      if (timezone) {
        mockTimezone.unregister();
      }
    };

    it('In current timezone', () => runCasesWithTimezone());
    it('In timezone US/Pacific', () => runCasesWithTimezone('US/Pacific'));
    it('In timezone Europe/London', () => runCasesWithTimezone('Europe/London'));
    it('In timezone Australia/Adelaide', () => runCasesWithTimezone('Australia/Adelaide'));
  });
});
