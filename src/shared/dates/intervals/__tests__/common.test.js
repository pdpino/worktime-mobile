import { isBetween } from '../common';

describe('isBetween', () => {
  describe('Invalid input handling', () => {
    it('Returns false if date is non valid', () => {
      const anyDate = new Date();
      expect(isBetween(anyDate, anyDate, null)).toBeFalse();
      expect(isBetween(anyDate, anyDate)).toBeFalse();
      expect(isBetween(anyDate, anyDate, '')).toBeFalse();
      expect(isBetween(anyDate, anyDate, '2019-01-31')).toBeFalse();
    });
  });

  describe('Date limits not present', () => {
    it('Returns true if both limits are not valid', () => {
      const anyDate = new Date();
      expect(isBetween(null, null, anyDate)).toBeTrue();
      expect(isBetween('hello', 'world', anyDate)).toBeTrue();
    });

    it('Returns correctly with left limit only', () => {
      const dateA = new Date(2019, 7, 6, 14, 0, 0);
      expect(isBetween(dateA, null, new Date(2019, 7, 5))).toBeFalse();
      expect(isBetween(dateA, null, new Date(2019, 7, 6, 13, 59))).toBeFalse();
      expect(isBetween(dateA, null, new Date(2019, 7, 6, 14, 1))).toBeTrue();
      expect(isBetween(dateA, null, new Date(2019, 7, 9))).toBeTrue();
    });

    it('Returns correctly with right limit only', () => {
      const dateB = new Date(2019, 7, 6, 14, 0, 0);
      expect(isBetween(null, dateB, new Date(2019, 7, 5))).toBeTrue();
      expect(isBetween(null, dateB, new Date(2019, 7, 6, 13, 59))).toBeTrue();
      expect(isBetween(null, dateB, new Date(2019, 7, 6, 14, 1))).toBeFalse();
      expect(isBetween(null, dateB, new Date(2019, 7, 9))).toBeFalse();
    });
  });

  describe('All arguments present', () => {
    const dateA = new Date(2019, 1, 3, 14, 0, 0);
    const dateB = new Date(2019, 1, 6, 18, 0, 0);
    it('Returns false if date is behind', () => {
      expect(isBetween(dateA, dateB, new Date(2018, 1, 5))).toBeFalse();
      expect(isBetween(dateA, dateB, new Date(2019, 0, 31))).toBeFalse();
      expect(isBetween(dateA, dateB, new Date(2019, 1, 3, 13, 59))).toBeFalse();
    });
    it('Returns true if date is between', () => {
      expect(isBetween(dateA, dateB, new Date(2019, 1, 4))).toBeTrue();
      expect(isBetween(dateA, dateB, new Date(2019, 1, 3, 15))).toBeTrue();
      expect(isBetween(dateA, dateB, new Date(2019, 1, 6, 17, 59))).toBeTrue();
    });
    it('Returns false if date is ahead', () => {
      expect(isBetween(dateA, dateB, new Date(2019, 1, 6, 18, 1))).toBeFalse();
      expect(isBetween(dateA, dateB, new Date(2019, 1, 7))).toBeFalse();
      expect(isBetween(dateA, dateB, new Date(2020, 1, 5))).toBeFalse();
    });
  });
});
