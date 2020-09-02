import * as RNLocalize from 'react-native-localize';
import { getFactory } from '../../../redux/__tests__';
import TimeStats from '../TimeStats';

const tzName = RNLocalize.getTimeZone();

const getWorkSessionData = ({ dateStart, timeTotal, ...rest }) => {
  const timestampStart = dateStart.getTime() / 1000;
  return {
    timestampStart,
    timestampEnd: timestampStart + timeTotal,
    timeTotal,
    tzName,
    ...rest,
  };
};

const factory = getFactory();

describe('sumSubjectTimes', () => {
  let subject;

  afterEach(() => factory.cleanUp());

  beforeEach(async () => {
    subject = await factory.create('Subject');
    await factory.createMany('WorkSession', 2, [
      getWorkSessionData({
        subject: subject.id,
        dateStart: new Date(2019, 10, 8, 13, 45),
        timeTotal: 1000,
        timeEffective: 1000,
      }),
      getWorkSessionData({
        subject: subject.id,
        dateStart: new Date(2019, 10, 8, 14, 45),
        timeTotal: 1000,
        timeEffective: 500,
      }),
    ]);
  });

  it('Sum times correctly', () => {
    const timeStats = new TimeStats();
    timeStats.sumSubjectTimes(subject);
    const { timeTotal, timeEffective } = timeStats.stats;
    expect(timeTotal).toEqual(2000);
    expect(timeEffective).toEqual(1500);
  });
});

describe('sumTimes', () => {
  describe('Base cases', () => {
    // TODO: no subjects, no categories
  });

  describe('Times calculation', () => {
    let categories;
    let subjects;
    const subjectsTab = {
      key: 'subjects',
      selectedId: null,
    };
    const categoriesTab = {
      key: 'categories',
      selectedId: null,
    };

    const sumTimes = (...params) => {
      const timeStats = new TimeStats();
      timeStats.sumTimes(...params);
      const { timeTotal, timeEffective } = timeStats.stats;
      return { timeTotal, timeEffective };
    };

    afterAll(() => factory.cleanUp());

    beforeAll(async () => {
      categories = await factory.createMany('Category', 2);
      const [category1, category2] = categories;

      subjects = await factory.createMany('Subject', 3, [
        { category: category1.id },
        { category: category2.id },
        {},
      ]);
      const [subject1, subject2, subject3] = subjects;

      await factory.createMany('WorkSession', 4, [
        getWorkSessionData({
          subject: subject1.id,
          dateStart: new Date(2019, 10, 8, 13, 45),
          timeTotal: 1000,
          timeEffective: 1000,
        }),
        getWorkSessionData({
          subject: subject1.id,
          dateStart: new Date(2019, 10, 3, 14, 45),
          timeTotal: 1000,
          timeEffective: 500,
        }),
        getWorkSessionData({
          subject: subject2.id,
          dateStart: new Date(2019, 9, 4, 19, 45),
          timeTotal: 3000,
          timeEffective: 800,
        }),
        getWorkSessionData({
          subject: subject3.id,
          dateStart: new Date(2019, 9, 1, 0, 45),
          timeTotal: 7000,
          timeEffective: 3000,
        }),
      ]);
    });

    it('Sum times correctly with no filter and infinite time', () => {
      const { timeTotal, timeEffective } = sumTimes(
        subjects,
        categories,
        null,
        null,
        null,
        subjectsTab,
      );
      expect(timeTotal).toEqual(12000);
      expect(timeEffective).toEqual(5300);
    });

    it('Sum times correctly with left date filter', () => {
      const { timeTotal, timeEffective } = sumTimes(
        subjects,
        categories,
        new Date(2019, 10, 1),
        null,
        null,
        subjectsTab,
      );
      expect(timeTotal).toEqual(2000);
      expect(timeEffective).toEqual(1500);
    });

    it('Sum times correctly with right date filter', () => {
      const { timeTotal, timeEffective } = sumTimes(
        subjects,
        categories,
        null,
        new Date(2019, 10, 1),
        null,
        subjectsTab,
      );
      expect(timeTotal).toEqual(10000);
      expect(timeEffective).toEqual(3800);
    });

    it('Sum times correctly with both date filters', () => {
      const { timeTotal, timeEffective } = sumTimes(
        subjects,
        categories,
        new Date(2019, 9, 3),
        new Date(2019, 10, 4),
        null,
        subjectsTab,
      );
      expect(timeTotal).toEqual(4000);
      expect(timeEffective).toEqual(1300);
    });

    it('Sum times correctly with both date filters in the same day', () => {
      const result1 = sumTimes(
        subjects,
        categories,
        new Date(2019, 9, 1),
        new Date(2019, 9, 2),
        null,
        subjectsTab,
      );
      expect(result1.timeTotal).toEqual(7000);
      expect(result1.timeEffective).toEqual(3000);

      const result2 = sumTimes(
        subjects,
        categories,
        new Date(2019, 9, 4),
        new Date(2019, 9, 4),
        null,
        subjectsTab,
      );
      expect(result2.timeTotal).toEqual(3000);
      expect(result2.timeEffective).toEqual(800);
    });

    it('Sum times correctly with subjects filter', () => {
      const [subject1, subject2, subject3] = subjects;
      const result1 = sumTimes(
        subjects,
        categories,
        null,
        null,
        { [subject3.id]: true },
        subjectsTab,
      );
      expect(result1.timeTotal).toEqual(7000);
      expect(result1.timeEffective).toEqual(3000);

      const result2 = sumTimes(
        subjects,
        categories,
        null,
        null,
        { [subject1.id]: true, [subject2.id]: true },
        subjectsTab,
      );
      expect(result2.timeTotal).toEqual(5000);
      expect(result2.timeEffective).toEqual(2300);
    });

    it('Sum times correctly with subjects filter and dates filter', () => {
      const subject1 = subjects[0];
      const { timeTotal, timeEffective } = sumTimes(
        subjects,
        categories,
        new Date(2019, 10, 5),
        new Date(2019, 10, 10),
        { [subject1.id]: true },
        subjectsTab,
      );
      expect(timeTotal).toEqual(1000);
      expect(timeEffective).toEqual(1000);
    });

    it('Sum times correctly with categories filter', () => {
      const [category1, category2] = categories;
      const result1 = sumTimes(
        subjects,
        categories,
        null,
        null,
        { [category2.id]: true },
        categoriesTab,
      );
      expect(result1.timeTotal).toEqual(3000);
      expect(result1.timeEffective).toEqual(800);

      const result2 = sumTimes(
        subjects,
        categories,
        null,
        null,
        { [category1.id]: true, [-1]: true },
        categoriesTab,
      );
      expect(result2.timeTotal).toEqual(9000);
      expect(result2.timeEffective).toEqual(4500);
    });
  });

  describe('Day statistics', () => {
    // TODO
  });
});
