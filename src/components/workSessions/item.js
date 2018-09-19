import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { prettyDate, prettyDuration } from '../../shared/utils';

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  subitem: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingVertical: 4,
    paddingHorizontal: 2,
    marginRight: 50,
  },
  text: {
    color: 'black',
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

const WorkSessionItem = ({ workSession }) => {
  // DICTIONARY (text)
  const { nPauses, timeTotal, timeEffective } = workSession;

  const times = (
    <View>
      <Text style={styles.text}>
        {`Total: ${prettyDuration(timeTotal)}`}
      </Text>
      <Text style={styles.text}>
        {`Effective: ${prettyDuration(timeEffective)}`}
      </Text>
      <Text style={styles.text}>
        {`${nPauses || 0} pauses`}
      </Text>
    </View>
  );

  const status = (
    <Text style={[styles.text, { color: status2Color[workSession.status] }]}>
      {status2Text[workSession.status]}
    </Text>
  );

  return (
    <View style={styles.item}>
      <View style={styles.subitem}>
        <Text style={styles.text}>
          {prettyDate(workSession.date)}
        </Text>
        <Text style={styles.text}>
          {workSession.getPrettyHourStart()}
          {' - '}
          {workSession.getPrettyHourEnd()}
        </Text>
      </View>
      <View style={styles.subitem}>
        {workSession.status !== 'stopped' ? status : times}
      </View>
    </View>
  );
};

export default WorkSessionItem;
