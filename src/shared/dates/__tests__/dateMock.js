const OriginalDate = Date;
let dateSpy;
let nowSpy;

const mockToday = (fixedDay) => {
  const fixedTimestamp = fixedDay.getTime();
  const MockDate = (...args) => {
    if (args.length === 0) {
      return new OriginalDate(fixedTimestamp);
    }
    return new OriginalDate(...args);
  };

  nowSpy = jest.spyOn(global.Date, 'now').mockImplementation(() => fixedTimestamp);
  dateSpy = jest.spyOn(global, 'Date').mockImplementation((...args) => MockDate(...args));
};

const restoreMock = () => {
  dateSpy.mockRestore();
  nowSpy.mockRestore();
};

const ODate = OriginalDate;

export {
  mockToday,
  restoreMock,
  OriginalDate,
  ODate,
};
