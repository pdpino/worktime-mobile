import React from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import { CalendarPicker } from '.';
import { DropdownMenu } from '../menus';
import { getToday } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 5,
  },
  shortcutsList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  shortcut: {
    backgroundColor: '#9BBBFF',
    borderRadius: 5,
    marginVertical: 6,
    marginHorizontal: 3,
    paddingHorizontal: 3,
  },
  shortcutText: {
    textAlign: 'center',
    color: 'black',
  },
});

// DICTIONARY
const shortcutsLabels = {
  none: 'None',
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  lastWeek: 'Last Week',
  thisMonth: 'This Month',
  lastMonth: 'Last Month',
};

// DICTIONARY
const stringFrom = 'From';
const stringTo = 'To';

const DateRangeFilter = ({
  initialDate, endingDate, onChangeInitialDate, onChangeEndingDate, shortcuts,
}) => {
  const pickers = (
    <View style={styles.row}>
      <Text style={styles.text}>
        {stringFrom}
      </Text>
      <CalendarPicker
        date={initialDate}
        maxDate={endingDate || getToday()}
        onDayPress={day => onChangeInitialDate(day.dateString)}
      />
      <Text style={styles.text}>
        {stringTo}
      </Text>
      <CalendarPicker
        date={endingDate}
        minDate={initialDate}
        maxDate={getToday()}
        onDayPress={day => onChangeEndingDate(day.dateString)}
      />
    </View>
  );

  // HACK: it should choose this number according to width
  const chooseShortcuts = 4;
  const firstShortcuts = shortcuts.slice(0, chooseShortcuts);
  const lastShortcuts = shortcuts.slice(chooseShortcuts);

  const renderShortcut = shortcut => (
    <TouchableOpacity
      style={styles.shortcut}
      onPress={shortcut.callback}
    >
      <Text style={styles.shortcutText}>
        {shortcutsLabels[shortcut.name]}
      </Text>
    </TouchableOpacity>
  );

  const shortcutsButtons = (
    <View style={styles.row}>
      <FlatList
        horizontal
        contentContainerStyle={styles.shortcutsList}
        data={firstShortcuts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => renderShortcut(item)}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
      {
        lastShortcuts.length > 0 && (
          <DropdownMenu
            items={lastShortcuts.map(shortcut => ({
              ...shortcut,
              label: shortcutsLabels[shortcut.name],
            }))}
            iconSize={20}
          />
        )
      }
    </View>
  );

  return (
    <View style={styles.container}>
      {pickers}
      {shortcutsButtons}
    </View>
  );
};

export default DateRangeFilter;
