import React from 'react';
import { BackHandler, ScrollView, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import {
  SummaryComponent, TimeDetailsComponent, DateFilterComponent,
  DateShortcutsComponent,
} from '../../components/dashboard';
import { subjectsSelector, categoriesSelector } from '../../redux/selectors';
import { Memoizer } from '../../shared/utils';
import {
  getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth, shiftMonths,
  getStartOfSemester, shiftSemesters, subtractDays, getDaysInclusiveDiff, isSameDay,
  getToday,
} from '../../shared/dates';
import { sumTimesCalc, getEmptyStats } from '../../shared/timeCalculators';
import i18n from '../../shared/i18n';

export class Dashboard extends React.Component {
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
      isReloading: false,
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
    this.handleBackPress = this.handleBackPress.bind(this);

    this.handlePressLeft = () => this.handleShiftDate('left');
    this.handlePressRight = () => this.handleShiftDate('right');

    this.sumTimes = this.sumTimes.bind(this);
    this.memoizer = Memoizer();

    this.createShortcuts();

    this.didFocusListener = props.navigation.addListener(
      'didFocus',
      () => BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackPress,
      ),
    );
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      this.sumTimes,
    );
    this.willBlurListener = this.props.navigation.addListener(
      'willBlur',
      () => BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackPress,
      ),
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  componentWillUnmount() {
    if (this.didFocusListener) this.didFocusListener.remove();
    if (this.willFocusListener) this.willFocusListener.remove();
    if (this.willBlurListener) this.willBlurListener.remove();
  }

  setStateAndSumTimes(params) {
    this.setState({
      ...params,
    }, () => this.sumTimes());
  }

  handleBackPress() {
    if (this.state.tab.selectedId != null) {
      this.handlePressClearItem();
      return true;
    }
    return false;
  }

  createShortcuts() {
    const getDayShifter = (amount) => (initialDate, endingDate, shift) => ({
      initialDate: subtractDays(initialDate, -shift * amount),
      endingDate: subtractDays(endingDate, -shift * amount),
    });

    this.shortcuts = [
      {
        key: 'day',
        label: i18n.t('dates.today'),
        callback: () => this.handleChangeDates(getToday(), getToday(), 'day'),
        shifter: getDayShifter(1),
      },
      {
        key: 'week',
        label: i18n.t('dates.thisWeek'),
        callback: () => this.handleChangeDates(
          getStartOfWeek(),
          getEndOfWeek(),
          'week',
        ),
        shifter: getDayShifter(7),
      },
      {
        key: 'month',
        label: i18n.t('dates.thisMonth'),
        callback: () => this.handleChangeDates(
          getStartOfMonth(),
          getEndOfMonth(),
          'month',
        ),
        shifter: (initialDate, _, shift) => shiftMonths(initialDate, shift),
      },
      {
        key: 'semester',
        label: i18n.t('dates.thisSemester'),
        callback: () => this.handleChangeDates(
          getStartOfSemester(),
          getToday(),
          'semester',
        ),
        shifter: (initialDate, _, shift) => shiftSemesters(initialDate, shift),
      },
      {
        key: 'none',
        label: i18n.t('dates.allTime'),
        callback: () => this.handleChangeDates(null, getToday(), 'none'),
      },
    ];

    this.dateShifters = {};
    this.shortcuts.forEach((shortcut) => {
      this.dateShifters[shortcut.key] = shortcut.shifter;
    });
  }

  handleChangeDate(key) {
    return (date) => {
      if (Dashboard.isSameDay(this.state[key], date)) {
        return;
      }
      this.setStateAndSumTimes({
        [key]: date,
        dateShortcutSelection: null,
        isReloading: true,
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
      isReloading: true,
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
      const nDays = getDaysInclusiveDiff(initialDate, endingDate);
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
      isReloading: true,
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
      this.setState({
        isLoading: false,
        isReloading: false,
      });
      return;
    }

    InteractionManager.runAfterInteractions(() => {
      sumTimesCalc(...params).then((timeStats) => this.setState({
        isLoading: false,
        isReloading: false,
        timeStats,
      }));
    });
  }

  handleToggleItem(itemId) {
    const idsSelection = {
      ...this.state.idsSelection,
      [itemId]: !this.state.idsSelection[itemId],
    };
    const anySelected = Object.keys(idsSelection)
      .some((key) => idsSelection[key]);

    this.setStateAndSumTimes({
      idsSelection,
      allSelected: anySelected,
      isReloading: true,
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
      isReloading: true,
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
      isLoading: true,
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
      isLoading: true,
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
      isLoading: true,
    });
  }

  render() {
    const { categories } = this.props;
    const {
      initialDate, endingDate, dateShortcutSelection,
      idsSelection, allSelected, timeStats, tab, isLoading, isReloading,
    } = this.state;
    const {
      itemsSummaries, timeTotal,
    } = timeStats;

    const { selectedId } = tab;

    let title = null;
    if (selectedId != null) {
      if (selectedId === -1) {
        title = i18n.t('entities.noCategory');
      } else {
        const selectedCategory = categories
          .find((category) => category.id === selectedId);
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
          onPressLeft={this.handlePressLeft}
          onPressRight={this.handlePressRight}
        />
        <SummaryComponent
          timeStats={timeStats}
          initialDate={initialDate}
          endingDate={endingDate}
          isLoading={isLoading || isReloading}
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

const mapStateToProps = (state) => ({
  subjects: subjectsSelector(state, { archived: false }),
  categories: categoriesSelector(state),
});

export default connect(mapStateToProps)(Dashboard);
