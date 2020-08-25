import React from 'react';
import { StyleSheet, View } from 'react-native';
import Arrow from './arrow';
import { TextDropdownMenu } from '../../../shared/UI/menus';
import { prettyDaysSpan, prettyShortcutSelection } from '../../../shared/dates';
import { colors } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: colors.lighterGray,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.mainBlue,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    paddingVertical: 4,
  },
  text: {
    fontSize: 18,
  },
});

const DateShortcuts = ({
  shortcuts, shortcutSelection, initialDate, endingDate,
  onPressLeft, onPressRight,
}) => {
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
};

export default React.memo(DateShortcuts);
