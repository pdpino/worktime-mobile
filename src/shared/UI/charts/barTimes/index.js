import React from 'react';
import {
  View, Text, StyleSheet, FlatList, Dimensions,
} from 'react-native';
import TimeItem from './timeItem';
import i18n from '../../../i18n';

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
  const maxWidthUsed = deviceWidth - 70; // FIXME: hardcoded

  const maxValue = Math.max(...data.map(item => item[key]));

  return maxWidthUsed / maxValue;
}

const emptyComponent = (
  <View style={styles.emptyComponent}>
    <Text style={styles.emptyText}>
      {i18n.t('entities.noItems')}
    </Text>
  </View>
);

const BarTimes = ({
  itemsSummaries, idsSelection, allItemsTotal, itemPressEnabled,
  onToggleItem, onPressItem, nameKey, palette,
  listProps,
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
      palette={palette}
    />
  );

  return itemsSummaries ? (
    <FlatList
      data={itemsSummaries}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      extraData={idsSelection}
      ListEmptyComponent={emptyComponent}
      {...listProps}
    />
  ) : null;
};

export default BarTimes;
