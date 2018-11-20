import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { prettyDuration } from '../../shared/utils/dates';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  box: {
    backgroundColor: '#e8eaf6',
    borderWidth: 1,
    borderRadius: 5,
  },
  subjectsContainer: {
    flexDirection: 'column',
    height: 80,
    width: 200,
  },
  subjectsLabel: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  subjectsPicker: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
  },
  statusContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  statusRow: {
    flexDirection: 'row',
    padding: 7,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  statusText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginHorizontal: 20,
  },
  statusCurrent: {
    fontWeight: 'bold',
  },
  statusTimeLabel: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    width: 110,
    height: 70,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
  },
  buttonContainerView: {
    elevation: 5,
    borderRadius: 4,
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
const chooseSubject = 'Choose a Subject';
const statusLabel = 'Status';
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';

const baseIconOptions = {
  type: 'font-awesome',
  size: 30,
  style: { marginRight: 0 },
};

const WorkPlayer = ({
  picker, status, timeTotal, timeEffective,
  playerEnabled, showPlay, stopDisabled,
  onPressPlayPause, onPressStop, onLongPressStop,
}) => {
  const subjectsBox = (
    <View style={[styles.box, styles.subjectsContainer]}>
      <Text style={styles.subjectsLabel}>
        {chooseSubject}
      </Text>
      <View style={styles.subjectsPicker}>
        {picker}
      </View>
    </View>
  );

  const statusRowCurrent = (
    <View style={styles.statusRow}>
      <Text style={styles.statusText}>
        {statusLabel}
      </Text>
      <Text style={
        [
          styles.statusText,
          styles.statusCurrent,
          { color: status2Color[status] },
        ]}
      >
        {status2Text[status] || 'Stopped'}
      </Text>
    </View>
  );

  const statusRowTime = (label, seconds) => (
    <View style={styles.statusRow}>
      <Text style={[styles.statusText, styles.statusTimeLabel]}>
        {label}
      </Text>
      <Text style={[styles.statusText, styles.statusTimeLabel]}>
        {seconds > 0 ? prettyDuration(seconds) : '-'}
      </Text>
    </View>
  );

  const playPauseButton = (
    <Button
      containerViewStyle={styles.buttonContainerView}
      buttonStyle={[
        styles.button,
        { backgroundColor: 'darkcyan' },
      ]}
      icon={{
        ...baseIconOptions,
        name: showPlay ? 'play' : 'pause',
      }}
      onPress={onPressPlayPause}
      disabled={!playerEnabled}
    />
  );

  const stopButton = (
    <Button
      containerViewStyle={styles.buttonContainerView}
      buttonStyle={[
        styles.button,
        { backgroundColor: '#d50000' },
      ]}
      icon={{
        ...baseIconOptions,
        name: 'stop',
      }}
      onPress={onPressStop}
      onLongPress={onLongPressStop}
      disabled={!playerEnabled || stopDisabled}
    />
  );

  return (
    <View style={styles.container}>
      {subjectsBox}
      <View style={[styles.box, styles.statusContainer]}>
        {statusRowCurrent}
        {statusRowTime(timeTotalLabel, timeTotal)}
        {statusRowTime(timeEffectiveLabel, timeEffective)}
      </View>
      <View style={styles.buttons}>
        {playPauseButton}
        {stopButton}
      </View>
    </View>
  );
};

export default WorkPlayer;
