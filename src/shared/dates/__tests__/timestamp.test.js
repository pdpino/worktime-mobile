import mockTimezone from 'timezone-mock';
import { toLocalDate } from '../timestamp';

const createTests = {
  utcOffset: () => [
    {
      timestamp: 1572816420,
      tzOffset: 0,
      tzName: 'UTC',
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 21,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1521693421,
      tzOffset: 0,
      tzName: 'UTC',
      outcome: {
        year: 2018,
        month: 3,
        day: 22,
        hours: 4,
        minutes: 37,
        seconds: 1,
      },
    },
  ],
  dstRuleChange: () => [
    // DST rules may change over the years
    // One year may be winter time
    {
      timestamp: 1599261637,
      tzOffset: 4 * 3600,
      tzName: 'America/Santiago',
      outcome: {
        year: 2020,
        month: 9,
        day: 4,
        hours: 19,
        minutes: 20,
        seconds: 37,
      },
    },
    // Other year may be summer time (notice the offset!)
    {
      timestamp: 1599261637,
      tzOffset: 3 * 3600,
      tzName: 'America/Santiago',
      outcome: {
        year: 2020,
        month: 9,
        day: 4,
        hours: 20,
        minutes: 20,
        seconds: 37,
      },
    },
  ],
  winterOffset: () => [
    {
      timestamp: 1561115420,
      tzOffset: 4 * 3600,
      tzName: 'America/Santiago',
      outcome: {
        year: 2019,
        month: 6,
        day: 21,
        hours: 7,
        minutes: 10,
        seconds: 20,
      },
    },
    {
      timestamp: 1572816420,
      tzOffset: 5 * 3600,
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
      tzOffset: 8 * 3600,
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
      timestamp: 1572816420,
      tzOffset: -1 * 3600,
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
      tzOffset: -2 * 3600,
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
  summerOffset: () => [
    {
      timestamp: 1572816420,
      tzOffset: 3 * 3600,
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
      tzOffset: 3 * 3600,
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
    {
      timestamp: 1561059271,
      tzOffset: 7 * 3600,
      tzName: 'America/Los_Angeles',
      outcome: {
        year: 2019,
        month: 6,
        day: 20,
        hours: 12,
        minutes: 34,
        seconds: 31,
      },
    },
    {
      timestamp: 1560816423,
      tzOffset: -2 * 3600,
      tzName: 'Europe/Madrid',
      outcome: {
        year: 2019,
        month: 6,
        day: 18,
        hours: 2,
        minutes: 7,
        seconds: 3,
      },
    },
    {
      timestamp: 1561725931, // FIXME
      tzOffset: -3 * 3600,
      tzName: 'Europe/Kiev',
      outcome: {
        year: 2019,
        month: 6,
        day: 28,
        hours: 15,
        minutes: 45,
        seconds: 31,
      },
    },
  ],
  nearZeroTimestamp: () => [
    {
      timestamp: 0,
      tzOffset: -1 * 3600,
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
      tzOffset: -3 * 3600,
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
      tzOffset: 3 * 3600,
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
    it('Returns a date on empty timezone data', () => {
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
        timestamp, tzOffset, outcome,
      } = testCase;
      const date = toLocalDate(timestamp, tzOffset);

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
      runTestsCases(createTests.utcOffset());
      runTestsCases(createTests.dstRuleChange());
      runTestsCases(createTests.winterOffset());
      runTestsCases(createTests.summerOffset());
      runTestsCases(createTests.nearZeroTimestamp());
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
