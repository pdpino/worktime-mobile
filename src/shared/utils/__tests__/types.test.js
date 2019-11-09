import { isNumber, isValidDate } from '../types';

describe('isNumber', () => {
  it('Returns falsy on non-number inputs', () => {
    expect(isNumber()).toBeFalsy();
    expect(isNumber(undefined)).toBeFalsy();
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber('hello')).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
    expect(isNumber(new Date())).toBeFalsy();
  });

  it('Returns truthy on inputs that can be parsed to number', () => {
    expect(isNumber(3)).toBeTruthy();
    expect(isNumber(-2)).toBeTruthy();
    expect(isNumber(0)).toBeTruthy();
    expect(isNumber('0')).toBeTruthy();
    expect(isNumber('1000')).toBeTruthy();
  });
});

describe('isValidDate', () => {
  it('Returns false on non date types', () => {
    expect(isValidDate()).toBeFalse();
    expect(isValidDate(undefined)).toBeFalse();
    expect(isValidDate(null)).toBeFalse();
    expect(isValidDate('hello')).toBeFalse();
    expect(isValidDate({})).toBeFalse();
    expect(isValidDate(-3)).toBeFalse();
    expect(isValidDate(3)).toBeFalse();
  });

  it('Returns false on invalid dates', () => {
    expect(isValidDate(new Date('world'))).toBeFalse();
  });

  it('Returns true on valid dates', () => {
    expect(isValidDate(new Date())).toBeTrue();
    expect(isValidDate(new Date(100000))).toBeTrue();
    expect(isValidDate(new Date(2019, 1, 10, 22, 15, 30))).toBeTrue();
  });
});
