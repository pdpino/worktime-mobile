import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextDropdownMenu } from '../../../shared/UI/menus';
import { prettyDaysSpan, prettyShortcutSelection } from '../../../shared/dates';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  textContainer: {
    borderColor: '#3B84B5',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingVertical: 4,
  },
  text: {
    fontSize: 18,
  },
  arrowContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#3B84B5',
    borderColor: '#3B84B5',
  },
  arrowLeft: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  arrowRight: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
});

class Arrow extends React.PureComponent {
  render() {
    const { direction, onPress } = this.props;

    const directionStyles = direction === 'left'
      ? styles.arrowLeft
      : styles.arrowRight;

    return (
      <Icon
        containerStyle={[styles.arrowContainer, directionStyles]}
        name={`caret-${direction}`}
        type="font-awesome"
        color="white"
        size={22}
        onPress={onPress}
        underlayColor="#71b3e7"
      />
    );
  }
}

class DateShortcuts extends React.PureComponent {
  render() {
    const {
      shortcuts, shortcutSelection, initialDate, endingDate,
      onPressLeft, onPressRight,
    } = this.props;

    const periodText = shortcutSelection
      ? prettyShortcutSelection(shortcutSelection)
      : prettyDaysSpan(initialDate, endingDate);

    return (
      <View style={styles.container}>
        <Arrow
          direction="left"
          onPress={onPressLeft}
        />
        <TextDropdownMenu
          containerStyle={styles.textContainer}
          textStyle={styles.text}
          text={periodText}
          items={shortcuts}
        />
        <Arrow
          direction="right"
          onPress={onPressRight}
        />
      </View>
    );
  }
}

export default DateShortcuts;
