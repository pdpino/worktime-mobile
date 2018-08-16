import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  status: {

  },
  time: {

  },
  button: {

  },
});

const status2Text = {
  playing: 'Playing',
  paused: 'Paused',
  stopped: 'Stopped',
}; // DICTIONARY

const WorkPlayer = ({
  status, showPlay, stopDisabled, onPressPlayPause, onPressStop,
}) => {
  const statusText = (
    <Text style={styles.status}>
      {status2Text[status] || 'Stopped'}
    </Text>
  );

  const statusTime = (
    <Text style={styles.time}>
      Time
    </Text>
  );

  const playPauseButton = (
    <Button
      style={styles.button}
      icon={{
        name: showPlay ? 'play' : 'pause',
        type: 'font-awesome',
      }}
      onPress={onPressPlayPause}
    />
  );

  const stopButton = (
    <Button
      style={styles.button}
      icon={{
        name: 'stop',
        type: 'font-awesome',
      }}
      onPress={onPressStop}
      disabled={stopDisabled}
    />
  );

  return (
    <View style={styles.container}>
      {statusText}
      {statusTime}
      {playPauseButton}
      {stopButton}
    </View>
  );
};

export default WorkPlayer;
