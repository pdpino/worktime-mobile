import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from './styles';
import { prettyDuration } from '../../shared/utils/dates';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    padding: 7,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginHorizontal: 20,
  },
  currentStatus: {
    fontWeight: 'bold',
  },
  timeLabel: {
    fontSize: 14,
  },
});

const status2Text = {
  playing: 'Playing',
  paused: 'Paused',
  stopped: 'Stopped',
}; // DICTIONARY

const status2Color = {
  playing: 'green',
  paused: 'orange',
  stopped: 'red',
}; // COLORS

// DICTIONARY
const statusLabel = 'Status';
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';

const StatusDisplayer = ({
  status, timeTotal, timeEffective,
}) => {
  const currentStatusRow = (
    <View style={styles.row}>
      <Text style={styles.text}>
        {statusLabel}
      </Text>
      <Text style={
        [
          styles.text,
          styles.currentStatus,
          { color: status2Color[status] },
        ]}
      >
        {status2Text[status] || 'Stopped'}
      </Text>
    </View>
  );

  const timeRow = (label, seconds) => (
    <View style={styles.row}>
      <Text style={[styles.text, styles.timeLabel]}>
        {label}
      </Text>
      <Text style={[styles.text, styles.timeLabel]}>
        {seconds > 0 ? prettyDuration(seconds) : '-'}
      </Text>
    </View>
  );

  return (
    <View style={[commonStyles.box, styles.container]}>
      {currentStatusRow}
      {timeRow(timeTotalLabel, timeTotal)}
      {timeRow(timeEffectiveLabel, timeEffective)}
    </View>
  );
};

export default StatusDisplayer;
