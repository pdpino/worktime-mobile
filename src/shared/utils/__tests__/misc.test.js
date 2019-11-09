import { toMaxFixed } from '../misc';

describe('toMaxFixed', () => {
  describe('Zero decimals', () => {
    it('with positive numbers without rounding up', () => {
      expect(toMaxFixed(2.3430, 0)).toEqual(2);
      expect(toMaxFixed(7.4002, 0)).toEqual(7);
      expect(toMaxFixed(100, 0)).toEqual(100);
    });
    it('with positive numbers rounding up', () => {
      expect(toMaxFixed(2.5, 0)).toEqual(3);
      expect(toMaxFixed(7.5002, 0)).toEqual(8);
    });
    it('with negative numbers without rounding up', () => {
      expect(toMaxFixed(-100, 0)).toEqual(-100);
      expect(toMaxFixed(-100.0, 0)).toEqual(-100);
      expect(toMaxFixed(-3.1230, 0)).toEqual(-3);
    });
    it('with negative numbers rounding up', () => {
      expect(toMaxFixed(-3.5230, 0)).toEqual(-4);
    });
  });

  describe('Returns correctly with one or more decimals', () => {
    it('with positive numbers without rounding up', () => {
      expect(toMaxFixed(2.543, 2)).toEqual(2.54);
      expect(toMaxFixed(2.543, 6)).toEqual(2.543);
      expect(toMaxFixed(7.512343, 3)).toEqual(7.512);
      expect(toMaxFixed(10, 3)).toEqual(10);
      expect(toMaxFixed(10.000, 5)).toEqual(10);
      expect(toMaxFixed(20.289, 6)).toEqual(20.289);
    });
    it('with positive numbers rounding up', () => {
      expect(toMaxFixed(2.567, 2)).toEqual(2.57);
      expect(toMaxFixed(20.289, 2)).toEqual(20.29);
    });
    it('with negative numbers without rounding up', () => {
      expect(toMaxFixed(-10, 2)).toEqual(-10);
      expect(toMaxFixed(-10.0, 2)).toEqual(-10);
      expect(toMaxFixed(-3.123, 2)).toEqual(-3.12);
    });
    it('with negative numbers rounding up', () => {
      expect(toMaxFixed(-3.126, 2)).toEqual(-3.13);
    });
  });
});
