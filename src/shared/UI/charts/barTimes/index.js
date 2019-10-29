import React from 'react';
import {
  View, Text, StyleSheet, FlatList, Dimensions,
} from 'react-native';
import TimeItem from './timeItem';

const styles = StyleSheet.create({
  emptyComponent: {
    flex: 1,
    paddingVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

function getWidthUnits(data, key) {
  if (!data) return 1;

  const deviceWidth = Dimensions.get('window').width;
  const maxWidthUsed = deviceWidth - 60; // FIXME: hardcoded

  const maxValue = Math.max(...data.map(item => item[key]));

  return maxWidthUsed / maxValue;
}

// DICTIONARY
const emptyComponent = (
  <View style={styles.emptyComponent}>
    <Text style={styles.emptyText}>
      No items
    </Text>
  </View>
);

const BarTimes = ({
  itemsSummaries, idsSelection, allItemsTotal, itemPressEnabled,
  onToggleItem, onPressItem, nameKey, colors,
}) => {
  const widthMultiplier = getWidthUnits(itemsSummaries, 'timeTotal');

  const renderItem = ({ item }) => (
    <TimeItem
      item={item}
      checked={idsSelection[item.id]}
      widthMultiplier={widthMultiplier}
      allItemsTotal={allItemsTotal}
      pressEnabled={itemPressEnabled}
      onToggle={() => onToggleItem(item.id)}
      onPress={() => onPressItem(item.id)}
      nameKey={nameKey}
      colors={colors}
    />
  );

  return itemsSummaries ? (
    <FlatList
      data={itemsSummaries}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      extraData={idsSelection}
      scrollEnabled={false}
      ListEmptyComponent={emptyComponent}
    />
  ) : null;
};

export default BarTimes;
