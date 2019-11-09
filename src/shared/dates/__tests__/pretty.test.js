import {
  prettyDate, timeToPrettyDate, prettyHour, prettyDaysAgo, prettyDuration,
  dateToDateString,
} from '../pretty';

describe('prettyDate', () => {
  describe('Invalid date handling', () => {
    it('Returns empty string on invalid date', () => {
      expect(prettyDate(null)).toEqual('');
      expect(prettyDate()).toEqual('');
      expect(prettyDate(3)).toEqual('');
      expect(prettyDate(new Date('asdf'))).toEqual('');
    });
  });

  describe('Result correctness', () => {
    // TODO: needs mocking up dates // Add tests on other functions
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
  describe('Invalid input handling', () => {
    it('Returns empty string on invalid timestamp', () => {
      expect(prettyHour()).toEqual('');
      expect(prettyHour(null)).toEqual('');
      expect(prettyHour('hello')).toEqual('');
      expect(prettyHour(new Date())).toEqual('');
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
