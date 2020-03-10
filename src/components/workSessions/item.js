import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { prettyDuration } from '../../shared/dates';
import { MoreDropdownMenu } from '../../shared/UI/menus';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingVertical: 4,
    paddingHorizontal: 2,
    marginRight: 30,
  },
  text: {
    color: 'black',
  },
  textDevice: {
    fontStyle: 'italic',
  },
  moreButtonContainer: {
    position: 'absolute', // HACK?
    right: 15,
  },
});

const status2Color = {
  playing: 'green',
  paused: 'orange',
  stopped: 'red',
}; // COLORS

class WorkSessionItem extends React.PureComponent {
  render() {
    const { workSession, onPressDelete } = this.props;
    const {
      id, nPauses, timeTotal, timeEffective, device,
    } = workSession;
    const tzOffset = workSession.getPrettyTimezoneOffset();

    const dateTimeItem = (
      <View style={styles.item}>
        <Text style={styles.text}>
          {workSession.getPrettyDate()}
        </Text>
        <Text style={styles.text}>
          {workSession.getPrettyHourStart()}
          {' - '}
          {workSession.getPrettyHourEnd()}
        </Text>
        <Text style={[styles.text, styles.textDevice]}>
          {`${device} (${tzOffset})`}
        </Text>
      </View>
    );

    const timesItem = (
      <View style={styles.item}>
        <Text style={styles.text}>
          {`${i18n.t('times.total')}: ${prettyDuration(timeTotal)}`}
        </Text>
        <Text style={styles.text}>
          {`${i18n.t('times.effective')}: ${prettyDuration(timeEffective)}`}
        </Text>
        <Text style={styles.text}>
          {i18n.t('times.nPauses', { count: nPauses || 0 })}
        </Text>
      </View>
    );

    const statusItem = (
      <View style={styles.item}>
        <Text style={[styles.text, { color: status2Color[workSession.status] }]}>
          {i18n.t(workSession.status, { scope: 'workPlayer' })}
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        {dateTimeItem}
        {timesItem}
        {workSession.status !== 'stopped' ? statusItem : (
          <View style={styles.moreButtonContainer}>
            <MoreDropdownMenu
              items={[
                {
                  label: i18n.t('deletion.delete'),
                  callback: () => onPressDelete(id),
                  textStyle: {
                    color: '#d50000',
                  },
                },
              ]}
            />
          </View>
        )}
      </View>
    );
  }
}

export default WorkSessionItem;
