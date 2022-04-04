import React from 'react';
import {
  StyleSheet, FlatList, Text, TouchableOpacity,
} from 'react-native';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  spanSelectorButton: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    color: 'black',
  },
  selected: {
    color: 'blue',
    fontStyle: 'italic',
  },
});

const AVAILABLE_SPANS = [
  'days',
  'weeks',
  'months',
  'years',
];

const SpanSelector = ({
  spanSelected, changeTimeSpan,
  // eslint-disable-next-line arrow-body-style
}) => {
  return (
    <FlatList
      data={AVAILABLE_SPANS}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.spanSelectorButton}
          onPress={() => changeTimeSpan(item)}
        >
          <Text
            style={[styles.text, item === spanSelected ? styles.selected : {}]}
          >
            {i18n.t(`timeSpans.${item}`)}
          </Text>
        </TouchableOpacity>
      )}
      extraData={spanSelected}
      keyExtractor={(item) => item}
    />
  );
};

export default SpanSelector;
