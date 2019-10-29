import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'; // REVIEW: try to hide moment
import {
  SummaryComponent, TimeDetailsComponent, DateFilterComponent,
  DateShortcutsComponent,
} from '../../components/dashboard/main';
import { subjectsSelector, categoriesSelector } from '../../redux/selectors';
import {
  isSameDay, getToday, getStartOfWeek, getEndOfWeek, getStartOfMonth,
  getEndOfMonth, getStartOfSemester, shiftMonths, shiftSemesters, subtractDays,
  getDiffDays, Memoizer,
} from '../../shared/utils';
import { sumTimesCalc, getEmptyStats } from '../../shared/timeCalculators';

class Dashboard extends React.Component {
  static isSameDay(dateA, dateB) {
    return (!dateA && !dateB) || isSameDay(dateA, dateB);
  }

  static getAllCategoriesSelection(categories) {
    const noCategoryId = -1;
    const idsSelection = { [noCategoryId]: true };
    categories.forEach((category) => {
      idsSelection[category.id] = true;
    });
    return idsSelection;
  }

  static getAllSubjectsSelection(subjects) {
    const idsSelection = {};
    subjects.forEach((subject) => {
      idsSelection[subject.id] = true;
    });
    return idsSelection;
  }

  static getAllSelection(key, subjects, categories) {
    if (key === 'subjects') {
      return Dashboard.getAllSubjectsSelection(subjects);
    } if (key === 'categories') {
      return Dashboard.getAllCategoriesSelection(categories);
    }
    return {};
  }

  static getFromCategorySelection(subjects, categoryId) {
    const idsSelection = {};
    subjects.forEach((subject) => {
      if (subject.getCategoryId() === categoryId) {
        idsSelection[subject.id] = true;
      }
    });
    return idsSelection;
  }

  constructor(props) {
    super(props);

    this.state = {
      initialDate: getToday(),
      endingDate: getToday(),
      dateShortcutSelection: { key: 'day', shifted: 0 },
      idsSelection: Dashboard.getAllCategoriesSelection(this.props.categories),
      allSelected: true,
      timeStats: getEmptyStats(),
      isLoading: true,
      tab: {
        key: 'categories',
        selectedId: null,
      },
    };

    this.handleChangeInitialDate = this.handleChangeDate('initialDate');
    this.handleChangeEndingDate = this.handleChangeDate('endingDate');
    this.handleChangeDates = this.handleChangeDates.bind(this);
    this.handleShiftDate = this.handleShiftDate.bind(this);
    this.handleToggleItem = this.handleToggleItem.bind(this);
    this.handleToggleAllItems = this.handleToggleAllItems.bind(this);
    this.handlePressTab = this.handlePressTab.bind(this);
    this.handlePressItem = this.handlePressItem.bind(this);
    this.handlePressClearItem = this.handlePressClearItem.bind(this);

    this.sumTimes = this.sumTimes.bind(this);
    this.memoizer = Memoizer();

    this.createShortcuts();
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', this.sumTimes);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  setStateAndSumTimes(params) {
    this.setState({
      ...params,
      isLoading: true,
    }, () => this.sumTimes());
  }

  createShortcuts() {
    const getDayShifter = amount => (initialDate, endingDate, shift) => ({
      initialDate: subtractDays(initialDate, -shift * amount),
      endingDate: subtractDays(endingDate, -shift * amount),
    });

    // DICTIONARY
    this.shortcuts = [
      {
        key: 'day',
        label: 'Today',
        callback: () => this.handleChangeDates(getToday(), getToday(), 'day'),
        shifter: getDayShifter(1),
      },
      {
        key: 'week',
        label: 'This week',
        callback: () => this.handleChangeDates(
          getStartOfWeek(),
          getEndOfWeek(),
          'week',
        ),
        shifter: getDayShifter(7),
      },
      {
        key: 'month',
        label: 'This month',
        callback: () => this.handleChangeDates(
          getStartOfMonth(),
          getEndOfMonth(),
          'month',
        ),
        shifter: (initialDate, _, shift) => shiftMonths(initialDate, shift),
      },
      {
        key: 'semester',
        label: 'This Semester',
        callback: () => this.handleChangeDates(
          getStartOfSemester(),
          getToday(),
          'semester',
        ),
        shifter: (initialDate, _, shift) => shiftSemesters(initialDate, shift),
      },
      {
        key: 'none',
        label: 'All time',
        callback: () => this.handleChangeDates(null, getToday(), 'none'),
      },
    ];

    this.dateShifters = {};
    this.shortcuts.forEach((shortcut) => {
      this.dateShifters[shortcut.key] = shortcut.shifter;
    });
  }

  handleChangeDate(key) {
    return (dateString) => {
      if (Dashboard.isSameDay(this.state[key], dateString)) {
        return;
      }
      this.setStateAndSumTimes({
        [key]: moment(dateString),
        dateShortcutSelection: null,
      });
    };
  }

  handleChangeDates(newInitialDate, newEndingDate, shortcutKey) {
    const { initialDate, endingDate } = this.state;
    if (Dashboard.isSameDay(initialDate, newInitialDate)
      && Dashboard.isSameDay(endingDate, newEndingDate)) {
      return;
    }
    this.setStateAndSumTimes({
      initialDate: newInitialDate,
      endingDate: newEndingDate,
      dateShortcutSelection: {
        key: shortcutKey,
        shifted: 0,
      },
    });
  }

  handleShiftDate(direction) {
    const { dateShortcutSelection, initialDate, endingDate } = this.state;
    const rightShift = direction === 'right' ? 1 : -1;

    let shifter;
    let shift;
    let newSelection;
    if (!dateShortcutSelection) {
      shifter = this.dateShifters.day;
      const nDays = getDiffDays(initialDate, endingDate);
      shift = nDays * rightShift;
      newSelection = null;
    } else {
      const { key, shifted } = dateShortcutSelection;
      shifter = this.dateShifters[key];
      if (!shifter) {
        return;
      }
      shift = rightShift;
      newSelection = { key, shifted: shifted + rightShift };
    }
    const newDates = shifter(initialDate, endingDate, shift);

    this.setStateAndSumTimes({
      dateShortcutSelection: newSelection,
      initialDate: newDates.initialDate,
      endingDate: newDates.endingDate,
    });
  }

  sumTimes() {
    const { subjects, categories } = this.props;
    const {
      initialDate, endingDate, idsSelection, tab,
    } = this.state;

    const params = [
      subjects,
      categories,
      initialDate,
      endingDate,
      idsSelection,
      tab,
    ];

    if (!this.memoizer.hasChanged(...params)) {
      this.setState({ isLoading: false });
      return;
    }

    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }

    sumTimesCalc(...params).then(timeStats => this.setState({
      isLoading: false,
      timeStats,
    }));
  }

  handleToggleItem(itemId) {
    const idsSelection = {
      ...this.state.idsSelection,
      [itemId]: !this.state.idsSelection[itemId],
    };
    const anySelected = Object.keys(idsSelection)
      .some(key => idsSelection[key]);

    this.setStateAndSumTimes({
      idsSelection,
      allSelected: anySelected,
    });
  }

  handleToggleAllItems() {
    const { subjects, categories } = this.props;
    const { tab, allSelected } = this.state;

    const idsSelection = allSelected
      ? {}
      : Dashboard.getAllSelection(tab.key, subjects, categories);

    this.setStateAndSumTimes({
      idsSelection,
      allSelected: !allSelected,
    });
  }

  handlePressTab(newKey) {
    const { key } = this.state.tab;
    if (key === newKey) return;

    const { subjects, categories } = this.props;
    const idsSelection = Dashboard.getAllSelection(
      newKey,
      subjects,
      categories,
    );

    this.setStateAndSumTimes({
      tab: {
        key: newKey,
        selectedId: null,
      },
      idsSelection,
      allSelected: true,
    });
  }

  handlePressItem(itemId) {
    const { key, selectedId } = this.state.tab;
    if (key === 'subjects'
      || (key === 'categories' && selectedId != null)) {
      return;
    }

    const { subjects } = this.props;
    const idsSelection = Dashboard.getFromCategorySelection(subjects, itemId);

    this.setStateAndSumTimes({
      tab: {
        key,
        selectedId: itemId,
      },
      idsSelection,
      allSelected: true,
    });
  }

  handlePressClearItem() {
    this.setStateAndSumTimes({
      tab: {
        key: 'categories',
        selectedId: null,
      },
      idsSelection: Dashboard.getAllCategoriesSelection(this.props.categories),
      allSelected: true,
    });
  }

  render() {
    const { categories } = this.props;
    const {
      initialDate, endingDate, dateShortcutSelection,
      idsSelection, allSelected, isLoading, timeStats, tab,
    } = this.state;
    const {
      itemsSummaries, timeTotal,
    } = timeStats;

    const { selectedId } = tab;

    let title = null;
    if (selectedId != null) {
      if (selectedId === -1) {
        title = 'No Category'; // DICTIONARY
      } else {
        const selectedCategory = categories
          .find(category => category.id === selectedId);
        title = selectedCategory && selectedCategory.name;
      }
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <DateFilterComponent
          initialDate={initialDate}
          endingDate={endingDate}
          onChangeInitialDate={this.handleChangeInitialDate}
          onChangeEndingDate={this.handleChangeEndingDate}
        />
        <DateShortcutsComponent
          shortcuts={this.shortcuts}
          shortcutSelection={dateShortcutSelection}
          initialDate={initialDate}
          endingDate={endingDate}
          onPressLeft={() => this.handleShiftDate('left')}
          onPressRight={() => this.handleShiftDate('right')}
        />
        <SummaryComponent
          timeStats={timeStats}
          isLoading={isLoading}
        />
        <TimeDetailsComponent
          itemsSummaries={itemsSummaries}
          selectedTab={tab}
          title={title}
          idsSelection={idsSelection}
          allSelected={allSelected}
          allItemsTotal={timeTotal}
          isLoading={isLoading}
          onToggleItem={this.handleToggleItem}
          onToggleAll={this.handleToggleAllItems}
          onPressTab={this.handlePressTab}
          onPressItem={this.handlePressItem}
          onPressClearItem={this.handlePressClearItem}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state, { archived: false }),
  categories: categoriesSelector(state),
});

export default connect(mapStateToProps)(Dashboard);
