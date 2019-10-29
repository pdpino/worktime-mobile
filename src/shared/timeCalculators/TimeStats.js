import {
  isBetween, isBefore, getDateCopy, smartDivision, countWeeks,
} from '../utils';

class TimeStats {
  constructor() {
    /* Internal variables */
    this.categoryIdToIdx = {};
    this.subjectsSummaries = [];
    this.categoriesSummaries = [];

    this.selectedTab = null;

    this.subjectsSelection = null;
    this.categoriesSelection = null;
    this.idsSelection = null;


    /* Overall stats calculated in the process and returned */
    this.stats = {
      itemsSummaries: [],
      daysWorked: {},
      timeTotal: 0,
      timeEffective: 0,
      firstDate: null,
      lastDate: null,
    };
  }

  initCategories(categories) {
    this.categoriesSummaries = categories.map((category, index) => {
      const { id, name } = category;
      this.categoryIdToIdx[category.id] = index;
      return {
        id,
        name,
        timeTotal: 0,
        timeEffective: 0,
        children: {},
      };
    });

    this.categoriesSummaries.push({
      id: -1,
      name: 'No Category', // DICTIONARY
      timeTotal: 0,
      timeEffective: 0,
      children: {},
    });
    this.categoryIdToIdx[-1] = this.categoriesSummaries.length - 1;
  }

  findCategoryById(categories, categoryId) {
    const index = this.categoryIdToIdx[categoryId];
    if (!index || index < 0 || index > categories.length) {
      return null;
    }
    return categories[index];
  }

  initSelection(tab, idsSelection) {
    this.selectedTab = { ...tab };
    this.idsSelection = idsSelection;

    const { key, selectedId } = this.selectedTab;

    if (key === 'categories' && selectedId == null) {
      this.categoriesSelection = idsSelection;
    } else {
      this.subjectsSelection = idsSelection;
    }
  }

  isCategorySelected(categoryId) {
    return !this.categoriesSelection || this.categoriesSelection[categoryId];
  }

  isSubjectSelected(subjectId) {
    return !this.subjectsSelection || this.subjectsSelection[subjectId];
  }

  updateDates(date) {
    const { firstDate, lastDate } = this.stats;
    this.stats.daysWorked[date] = true;

    if (!firstDate || isBefore(date, firstDate)) {
      this.stats.firstDate = getDateCopy(date);
    }

    if (!lastDate || isBefore(lastDate, date)) {
      this.stats.lastDate = getDateCopy(date);
    }
  }

  updateCategoryTimes(subjectId, categoryId, timeTotal, timeEffective) {
    const index = this.categoryIdToIdx[categoryId];
    if (!index && index !== 0) return;

    this.categoriesSummaries[index].timeTotal += timeTotal;
    this.categoriesSummaries[index].timeEffective += timeEffective;

    this.categoriesSummaries[index].children[subjectId] = true;
  }

  sumSubjectTimesReturn(subject, initialDate, endingDate) {
    const subjectId = subject.id;
    const categoryId = subject.getCategoryId();
    let timeTotal = 0;
    let timeEffective = 0;

    const isSubjectSelected = this.isSubjectSelected(subjectId);
    const isCategorySelected = this.isCategorySelected(categoryId);
    if (!(isSubjectSelected && isCategorySelected)) {
      return {
        timeTotal,
        timeEffective,
      };
    }

    subject.getWorkSessions({ sorted: false }).forEach((workSession) => {
      if (!isBetween(initialDate, endingDate, workSession.date)) {
        return;
      }
      this.updateDates(workSession.date);
      timeTotal += workSession.timeTotal;
      timeEffective += workSession.timeEffective;
    });

    this.updateCategoryTimes(subjectId, categoryId, timeTotal, timeEffective);

    return {
      timeTotal,
      timeEffective,
    };
  }

  sumSubjectTimes(...params) {
    const { timeTotal, timeEffective } = this.sumSubjectTimesReturn(...params);
    this.stats.timeTotal = timeTotal;
    this.stats.timeEffective = timeEffective;
  }

  sumTimes(
    subjects,
    categories,
    initialDate,
    endingDate,
    idsSelection,
    tab,
  ) {
    this.initCategories(categories);
    this.initSelection(tab, idsSelection);

    let addedTotal = 0;
    let addedEffective = 0;

    this.subjectsSummaries = subjects.map((subject) => {
      const {
        timeTotal: subjectTotal,
        timeEffective: subjectEffective,
      } = this.sumSubjectTimesReturn(subject, initialDate, endingDate);

      addedTotal += subjectTotal;
      addedEffective += subjectEffective;

      const { id, name } = subject;
      const categoryId = subject.getCategoryId();

      /* Category object from Model class */
      const categoryObj = this.findCategoryById(categories, categoryId);

      return {
        id,
        name,
        nameWithCategory: subject.getNameWithCategory(categoryObj),
        categoryId,
        timeTotal: subjectTotal,
        timeEffective: subjectEffective,
      };
    });

    this.stats.timeTotal = addedTotal;
    this.stats.timeEffective = addedEffective;
  }

  getItemsSummaries() {
    if (!this.selectedTab) return [];

    const { key, selectedId } = this.selectedTab;
    let itemsSummaries = [];

    if (selectedId != null) {
      if (key === 'categories') {
        itemsSummaries = this.subjectsSummaries
          .filter(subject => selectedId === subject.categoryId);
      }
    } else if (key === 'subjects') {
      itemsSummaries = this.subjectsSummaries;
    } else if (key === 'categories') {
      itemsSummaries = this.categoriesSummaries;
    }

    const isSelected = id => !this.idsSelection || this.idsSelection[id];

    return itemsSummaries.sort((item1, item2) => {
      const onlyOneSelected = isSelected(item2.id) - isSelected(item1.id);
      return onlyOneSelected || (item2.timeTotal - item1.timeTotal);
    });
  }

  getStats() {
    const {
      firstDate, lastDate, timeTotal, daysWorked,
    } = this.stats;

    const nDaysWorked = Object.keys(daysWorked).length;
    const dayAvg = smartDivision(timeTotal, nDaysWorked, false);

    const nWeeksWorked = (firstDate && lastDate)
      ? countWeeks(firstDate, lastDate) : 0;
    const weekAvg = smartDivision(timeTotal, nWeeksWorked, false);

    return {
      ...this.stats,
      itemsSummaries: this.getItemsSummaries(),
      nDaysWorked,
      dayAvg,
      nWeeksWorked,
      weekAvg,
    };
  }
}

export default TimeStats;
