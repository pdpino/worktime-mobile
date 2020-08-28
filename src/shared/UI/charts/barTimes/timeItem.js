import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import HorizontalBar from '../horizontalBar';
import { CheckboxIcon } from '../../icons';
import { prettyDuration } from '../../../dates';
import { prettyPercentage } from '../../../utils';
import { colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  checkboxContainer: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  textTitle: {
    flex: 1,
    marginRight: 10,
  },
});

const TimeItem = ({
  item, checked, widthMultiplier, allItemsTotal, pressEnabled,
  onToggle, onPress, nameKey, palette,
}) => {
  const { timeTotal, timeEffective } = item;
  const timePaused = timeTotal - timeEffective;

  const checkbox = (
    <CheckboxIcon
      checked={checked}
      onPress={onToggle}
      containerStyle={styles.checkboxContainer}
    />
  );

  const showBar = checked && timeTotal > 0;

  const itemName = item[nameKey || 'name'];
  const itemTitle = showBar
    ? `${itemName} (${prettyPercentage(timeTotal, allItemsTotal)})`
    : itemName;

  const stats = (
    <View style={styles.statsContainer}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.textTitle]}>
          {itemTitle}
        </Text>
        {checked && (
          <Text style={styles.text}>
            {prettyDuration(timeTotal)}
          </Text>
        )}
      </View>
      {showBar && (
        <HorizontalBar
          totalValue={timeTotal}
          totalWidth={timeTotal * widthMultiplier}
          values={[
            {
              width: timeEffective * widthMultiplier,
            },
            {
              width: timePaused * widthMultiplier,
            },
          ]}
          palette={palette}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {checkbox}
      <TouchableOpacity
        style={{ flex: 1 }}
        disabled={!pressEnabled}
        onPress={onPress}
        delayPressIn={0}
      >
        {stats}
      </TouchableOpacity>
    </View>
  );
};

export default TimeItem;
