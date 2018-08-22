import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

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
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
    marginHorizontal: 20,
  },
  statusLabel: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
  },
  status: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold',
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

const chooseSubject = 'Choose a Subject'; // DICTIONARY
const statusLabel = 'Status'; // DICTIONARY

const baseIconOptions = {
  type: 'font-awesome',
  size: 30,
  style: { marginRight: 0 },
};

const WorkPlayer = ({
  picker, status, playerEnabled, showPlay, stopDisabled, onPressPlayPause, onPressStop,
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

  const statusBox = (
    <View style={[styles.box, styles.statusContainer]}>
      <Text style={styles.statusLabel}>
        {statusLabel}
      </Text>
      <Text style={[styles.status, { color: status2Color[status] || 'black' }]}>
        {status2Text[status] || 'Stopped'}
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
        { backgroundColor: 'red' },
      ]}
      icon={{
        ...baseIconOptions,
        name: 'stop',
      }}
      onPress={onPressStop}
      disabled={!playerEnabled || stopDisabled}
    />
  );

  return (
    <View style={styles.container}>
      {subjectsBox}
      {statusBox}
      <View style={styles.buttons}>
        {playPauseButton}
        {stopButton}
      </View>
    </View>
  );
};

export default WorkPlayer;
