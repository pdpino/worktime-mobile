import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from './styles';
import { prettyDuration } from '../../shared/dates';
import i18n from '../../shared/i18n';
import { status2Color } from '../../shared/styles';

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

class StatusDisplayer extends React.PureComponent {
  static timeRow(label, seconds) {
    return (
      <View style={styles.row}>
        <Text style={[styles.text, styles.timeLabel]}>
          {label}
        </Text>
        <Text style={[styles.text, styles.timeLabel]}>
          {seconds > 0 ? prettyDuration(seconds) : '-'}
        </Text>
      </View>
    );
  }

  render() {
    const {
      status, timeTotal, timeEffective,
    } = this.props;

    const currentStatusRow = (
      <View style={styles.row}>
        <Text style={styles.text}>
          {i18n.t('status')}
        </Text>
        <Text style={[
          styles.text,
          styles.currentStatus,
          { color: status2Color[status] },
        ]}
        >
          {i18n.t(status, { scope: 'workPlayer' })}
        </Text>
      </View>
    );

    return (
      <View style={[commonStyles.box, styles.container]}>
        {currentStatusRow}
        {StatusDisplayer.timeRow(i18n.t('times.total'), timeTotal)}
        {StatusDisplayer.timeRow(i18n.t('times.effective'), timeEffective)}
      </View>
    );
  }
}

export default StatusDisplayer;
