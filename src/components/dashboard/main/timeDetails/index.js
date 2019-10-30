import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { BarTimesChart } from '../../../../shared/UI/charts';
import { BackIcon } from '../../../../shared/UI/icons';
import Tabs from './tabs';
import SubHeader from './subHeader';
import { colors } from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
    paddingBottom: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 18,
  },
});

const TimeDetails = ({
  itemsSummaries, selectedTab, title, idsSelection, allSelected, allItemsTotal,
  onPressTab, onToggleItem, onPressItem, onToggleAll, onPressClearItem,
  isLoading,
}) => {
  let header = null;
  if (title) {
    header = (
      <View style={styles.headerContainer}>
        <BackIcon
          color="black"
          onPress={onPressClearItem}
        />
        <Text style={styles.headerText}>
          {title}
        </Text>
      </View>
    );
  }

  const { key, selectedId } = selectedTab;
  const useNameWithCategory = key === 'subjects';
  const itemPressEnabled = key === 'categories' && selectedId == null;

  return (
    <View style={styles.container}>
      <Tabs
        selectedTabKey={key}
        onPressTab={onPressTab}
      />
      {header}
      <SubHeader
        nItems={itemsSummaries ? itemsSummaries.length : 0}
        isLoading={isLoading}
        allSelected={allSelected}
        onToggleAll={onToggleAll}
      />
      {!isLoading && (
        <BarTimesChart
          itemsSummaries={itemsSummaries}
          idsSelection={idsSelection}
          allItemsTotal={allItemsTotal}
          itemPressEnabled={itemPressEnabled}
          onToggleItem={onToggleItem}
          onPressItem={onPressItem}
          nameKey={useNameWithCategory ? 'nameWithCategory' : 'name'}
          colors={colors}
        />
      )}
    </View>
  );
};

export default TimeDetails;
