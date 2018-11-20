import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
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

const PlayerButton = ({
  iconName, backgroundColor, onPress, onLongPress, disabled,
}) => (
  <Button
    containerViewStyle={styles.buttonContainerView}
    buttonStyle={[
      styles.button,
      { backgroundColor },
    ]}
    icon={{
      type: 'font-awesome',
      size: 30,
      style: { marginRight: 0 },
      name: iconName,
    }}
    onPress={onPress}
    onLongPress={onLongPress}
    disabled={disabled}
  />
);

const PlayerButtons = ({
  playerEnabled, showPlay, stopDisabled, onPressPlayPause, onPressStop, onLongPressStop,
}) => (
  <View style={styles.container}>
    <PlayerButton
      iconName={showPlay ? 'play' : 'pause'}
      backgroundColor="darkcyan"
      onPress={onPressPlayPause}
      disabled={!playerEnabled}
    />
    <PlayerButton
      iconName="stop"
      backgroundColor="#d50000"
      onPress={onPressStop}
      onLongPress={onLongPressStop}
      disabled={!playerEnabled || stopDisabled}
    />
  </View>
);

export default PlayerButtons;
