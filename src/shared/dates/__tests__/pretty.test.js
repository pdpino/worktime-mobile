import {
  prettyDate, timeToPrettyDate, prettyHour, prettyDaysAgo, prettyDuration,
  dateToDateString,
} from '../pretty';
import i18n from '../../i18n';
import { mockToday, restoreMock, ODate } from './dateMock';

const HOUR_REGEX = /\d\d:\d\d/;

describe('prettyDate', () => {
  describe('Input handling', () => {
    it('Returns empty string on invalid date', () => {
      expect(prettyDate(null)).toEqual('');
      expect(prettyDate()).toEqual('');
      expect(prettyDate(3)).toEqual('');
      expect(prettyDate(new Date('asdf'))).toEqual('');
    });

    it('Returns non-empty string on valid date', () => {
      expect(prettyDate(new Date(2020, 8, 3))).toBeString().toBeTruthy();
      expect(prettyDate(new Date())).toBeString().toBeTruthy();
    });
  });

  describe('Result correctness', () => {
    const dictToday = i18n.t('dates.today');
    const dictYesterday = i18n.t('dates.yesterday');
    const dictTomorrow = i18n.t('dates.tomorrow');

    const fixedDay = new Date(2019, 10, 9, 14, 0, 0);
    beforeAll(() => {
      mockToday(fixedDay);
    });

    afterAll(() => {
      restoreMock();
    });

    it('Returns today correctly', () => {
      expect(prettyDate(fixedDay)).toEqual(dictToday);
      expect(prettyDate(new ODate(fixedDay.getTime()))).toEqual(dictToday);
    });

    it('Returns yesterday correctly', () => {
      expect(prettyDate(new ODate(2019, 10, 7))).not.toEqual(dictYesterday);
      expect(prettyDate(new ODate(2019, 10, 8))).toEqual(dictYesterday);
      expect(prettyDate(new ODate(2019, 10, 8, 0, 1))).toEqual(dictYesterday);
      expect(prettyDate(new ODate(2019, 10, 8, 23, 59))).toEqual(dictYesterday);
    });

    it('Returns tomorrow correctly', () => {
      expect(prettyDate(new ODate(2019, 10, 11))).not.toEqual(dictTomorrow);
      expect(prettyDate(new ODate(2019, 10, 10))).toEqual(dictTomorrow);
      expect(prettyDate(new ODate(2019, 10, 10, 0, 1))).toEqual(dictTomorrow);
      expect(prettyDate(new ODate(2019, 10, 10, 23, 59))).toEqual(dictTomorrow);
    });

    it('Returns other dates correctly', () => {
      expect(prettyDate(new ODate(2018, 10, 7))).toEqual('Wed 7 Nov 2018');
      expect(prettyDate(new ODate(2019, 10, 7))).toEqual('Thu 7 Nov');
    });
  });
});

describe('timeToPrettyDate', () => {
  describe('Invalid input handling', () => {
    it('Returns empty string on invalid timestamp', () => {
      expect(timeToPrettyDate()).toEqual('');
      expect(timeToPrettyDate(null)).toEqual('');
      expect(timeToPrettyDate('hello')).toEqual('');
      expect(timeToPrettyDate(new Date())).toEqual('');
    });
  });
});

describe('prettyHour', () => {
  describe('Input/output handling', () => {
    it('Returns empty string on invalid input', () => {
      expect(prettyHour()).toEqual('');
      expect(prettyHour(null)).toEqual('');
      expect(prettyHour('hello')).toEqual('');
    });

    it('Returns valid hour on valid input', () => {
      expect(prettyHour(8141723)).toMatch(HOUR_REGEX);
      expect(prettyHour(new Date())).toMatch(HOUR_REGEX);
    });
  });
});

describe('prettyDaysAgo', () => {
  describe('Invalid input handling', () => {
    it('Returns string on invalid timestamp', () => {
      expect(prettyDaysAgo()).toBeString();
      expect(prettyDaysAgo(null)).toBeString();
      expect(prettyDaysAgo('hello')).toBeString();
      expect(prettyDaysAgo(new Date())).toBeString();
    });
  });
});

describe('prettyDuration', () => {
  describe('Invalid input handling', () => {
    const zeroMinutes = '0m';
    it('Returns zero minutes on negative duration', () => {
      expect(prettyDuration(-3)).toEqual(zeroMinutes);
    });

    it('Returns zero minutes on non-number duration', () => {
      expect(prettyDuration()).toEqual(zeroMinutes);
      expect(prettyDuration(null)).toEqual(zeroMinutes);
      expect(prettyDuration('2019-11-09')).toEqual(zeroMinutes);
      expect(prettyDuration(new Date('hello'))).toEqual(zeroMinutes);
    });

    it('Returns zero seconds on non-number duration and includeSeconds', () => {
      const zeroSeconds = '0s';
      expect(prettyDuration(undefined, true)).toEqual(zeroSeconds);
      expect(prettyDuration(null, true)).toEqual(zeroSeconds);
      expect(prettyDuration('2019-11-09', true)).toEqual(zeroSeconds);
      expect(prettyDuration(new Date('hello'), true)).toEqual(zeroSeconds);
    });
  });

  describe('Result correctness', () => {
    it('Returns seconds correctly', () => {
      expect(prettyDuration(0, true)).toEqual('0s');
      expect(prettyDuration(10, true)).toEqual('10s');
      expect(prettyDuration(59, true)).toEqual('59s');
    });

    it('Returns minutes with seconds', () => {
      expect(prettyDuration(60, true)).toEqual('1m');
      expect(prettyDuration(90, true)).toEqual('1m 30s');
      expect(prettyDuration(3599, true)).toEqual('59m 59s');
    });

    it('Returns minutes without seconds', () => {
      expect(prettyDuration(60)).toEqual('1m');
      expect(prettyDuration(90)).toEqual('1m');
      expect(prettyDuration(1000)).toEqual('16m');
      expect(prettyDuration(3599)).toEqual('59m');
    });

    it('Returns hours without seconds', () => {
      expect(prettyDuration(3600)).toEqual('1h');
      expect(prettyDuration(7200)).toEqual('2h');
      expect(prettyDuration(8200)).toEqual('2h 16m');
      expect(prettyDuration(36220)).toEqual('10h 3m');
    });

    it('Returns hours with seconds', () => {
      expect(prettyDuration(3600, true)).toEqual('1h');
      expect(prettyDuration(8201, true)).toEqual('2h 16m 41s');
      expect(prettyDuration(36220, true)).toEqual('10h 3m 40s');
    });
  });
});

describe('dateToDateString', () => {
  describe('Invalid input handling', () => {
    it('Returns falsy on invalid date', () => {
      expect(dateToDateString()).toBeFalsy();
      expect(dateToDateString(null)).toBeFalsy();
      expect(dateToDateString('2019-11-09')).toBeFalsy();
      expect(dateToDateString(new Date('world'))).toBeFalsy();
    });
  });

  it('Returns correct format', () => {
    expect(dateToDateString(new Date(1967, 7, 26))).toEqual('1967-08-26');
    expect(dateToDateString(new Date(2018, 0, 3))).toEqual('2018-01-03');
    expect(dateToDateString(new Date(2019, 1, 8))).toEqual('2019-02-08');
    expect(dateToDateString(new Date(2020, 11, 9))).toEqual('2020-12-09');
  });
});
