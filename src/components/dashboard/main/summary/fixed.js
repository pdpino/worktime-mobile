import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { prettyDuration } from '../../../../shared/dates';
import { ClickableIcon } from '../../../../shared/UI/icons';
import i18n from '../../../../shared/i18n';
import { colorTotal, colorEffective } from '../colors';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontStyle: 'italic',
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  item: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  timeLabel: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 15,
    marginRight: 5,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const FixedSummary = ({
  timeStats, isCollapsed, toggleCollapse,
}) => {
  const {
    timeTotal, timeEffective,
  } = timeStats;

  const title = (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        {i18n.t('summary')}
      </Text>
    </View>
  );

  const createTimeItem = (dictLabel, time, color) => (
    <View style={styles.item}>
      <Text style={[styles.timeLabel, { color }]}>
        {dictLabel}
      </Text>
      <Text style={[styles.timeValue, { color }]}>
        {prettyDuration(time)}
      </Text>
    </View>
  );

  const toggleIcon = (
    <ClickableIcon
      icon={isCollapsed ? 'chevronDown' : 'chevronUp'}
      onPress={toggleCollapse}
    />
  );

  return (
    <View style={styles.container}>
      {title}
      <View style={styles.itemsContainer}>
        {createTimeItem(i18n.t('times.total'), timeTotal, colorTotal)}
        {createTimeItem(i18n.t('times.effective'), timeEffective, colorEffective)}
        {toggleIcon}
      </View>
    </View>
  );
};

export default FixedSummary;
