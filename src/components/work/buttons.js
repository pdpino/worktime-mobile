import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    width: 110,
    height: 70,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
  },
  buttonContainer: {
    elevation: 5,
    borderRadius: 4,
    marginHorizontal: 10,
  },
});

class PlayerButton extends React.PureComponent {
  render() {
    const {
      iconName, backgroundColor, onPress, onLongPress, disabled,
    } = this.props;

    return (
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={[
          styles.button,
          { backgroundColor },
        ]}
        icon={{
          type: 'font-awesome',
          size: 30,
          style: { marginRight: 0 },
          color: 'white',
          name: iconName,
        }}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
      />
    );
  }
}

const PlayerButtons = ({
  playerEnabled, showPlay, stopDisabled, onPressPlayPause, onPressStop, onLongPressStop,
}) => (
  <View style={styles.container}>
    <PlayerButton
      iconName={showPlay ? 'play' : 'pause'}
      backgroundColor={showPlay ? 'darkcyan' : colors.orange}
      onPress={onPressPlayPause}
      disabled={!playerEnabled}
    />
    <PlayerButton
      iconName="stop"
      backgroundColor={colors.red}
      onPress={onPressStop}
      onLongPress={onLongPressStop}
      disabled={!playerEnabled || stopDisabled}
    />
  </View>
);

export default PlayerButtons;
