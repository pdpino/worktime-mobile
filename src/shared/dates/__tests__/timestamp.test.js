import { toLocalDate } from '../timestamp';

const createTests = {
  baseOffset: () => [
    {
      timestamp: 1572816420,
      offset: 10800,
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
      offset: 25200,
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 14,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1572816420,
      offset: 14400,
      outcome: {
        year: 2019,
        month: 11,
        day: 3,
        hours: 17,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1573159271,
      offset: 21600,
      outcome: {
        year: 2019,
        month: 11,
        day: 7,
        hours: 14,
        minutes: 41,
        seconds: 11,
      },
    },
  ],
  negativeOffset: () => [
    {
      timestamp: 1572816420,
      offset: -25200,
      outcome: {
        year: 2019,
        month: 11,
        day: 4,
        hours: 4,
        minutes: 27,
        seconds: 0,
      },
    },
    {
      timestamp: 1572816420,
      offset: -14400,
      outcome: {
        year: 2019,
        month: 11,
        day: 4,
        hours: 1,
        minutes: 27,
        seconds: 0,
      },
    },
  ],
  nearZero: () => [
    {
      timestamp: 0,
      offset: 7200,
      outcome: {
        year: 1969,
        month: 12,
        day: 31,
        hours: 22,
        minutes: 0,
        seconds: 0,
      },
    },
    {
      timestamp: 0,
      offset: 10800,
      outcome: {
        year: 1969,
        month: 12,
        day: 31,
        hours: 21,
        minutes: 0,
        seconds: 0,
      },
    },
    {
      timestamp: 0,
      offset: -10800,
      outcome: {
        year: 1970,
        month: 1,
        day: 1,
        hours: 3,
        minutes: 0,
        seconds: 0,
      },
    },
  ],
};

describe('toLocalDate', () => {
  describe('Invalid input handling', () => {
    it('Returns a date on empty offset', () => {
      expect(toLocalDate(0)).toBeValidDate();
      expect(toLocalDate(1000, null)).toBeValidDate();
    });

    it('Returns null on empty timestamp', () => {
      expect(toLocalDate()).toBeNull();
      expect(toLocalDate(null)).toBeNull();
      expect(toLocalDate(null, 1080)).toBeNull();
    });

    it('Returns null on invalid timestamp', () => {
      expect(toLocalDate('hello')).toBeNull();
      expect(toLocalDate('world', 300)).toBeNull();
      expect(toLocalDate(new Date())).toBeNull();
    });
  });

  describe('Calculates date correctly from the offset', () => {
    const testCases = cases => cases.forEach((testCase) => {
      const { timestamp, offset, outcome } = testCase;
      const date = toLocalDate(timestamp, offset);

      expect(date.getFullYear()).toEqual(outcome.year);
      expect(date.getMonth()).toEqual(outcome.month - 1);
      expect(date.getDate()).toEqual(outcome.day);
      expect(date.getMinutes()).toEqual(outcome.minutes);
      expect(date.getSeconds()).toEqual(outcome.seconds);
      expect(date.getHours()).toEqual(outcome.hours);
    });

    it('With a base offset', () => testCases(createTests.baseOffset()));
    it('With positive offsets', () => testCases(createTests.positiveOffset()));
    it('With negative offsets', () => testCases(createTests.negativeOffset()));
    it('With near zero timestamps', () => testCases(createTests.nearZero()));
  });
});
