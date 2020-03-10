import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextDropdownMenu } from '../../../shared/UI/menus';
import { prettyDaysSpan, prettyShortcutSelection } from '../../../shared/dates';

// COLORS
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: '#dedede',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3B84B5',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    paddingVertical: 4,
  },
  text: {
    fontSize: 18,
  },
  arrowContainer: {
    backgroundColor: '#3B84B5',
    paddingHorizontal: 15,
  },
});

class Arrow extends React.PureComponent {
  render() {
    const { direction, onPress } = this.props;

    return (
      <Icon
        containerStyle={styles.arrowContainer}
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

    const { key, shifted } = shortcutSelection || {};

    const periodText = key
      ? prettyShortcutSelection(key, shifted)
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
