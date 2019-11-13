const OriginalDate = Date;
const nowDefaultFunction = Date.now;

const mockToday = (fixedDay) => {
  const fixedTimestamp = fixedDay.getTime();
  const MockDate = (...args) => {
    if (args.length === 0) {
      return new OriginalDate(fixedTimestamp);
    }
    return new OriginalDate(...args);
  };

  global.Date = MockDate;
  global.Date.now = jest.fn(() => fixedTimestamp);
};

const restoreMock = () => {
  global.Date = OriginalDate;
  global.Date.now = nowDefaultFunction;
};

const ODate = OriginalDate;

export {
  mockToday,
  restoreMock,
  OriginalDate,
  ODate,
};
