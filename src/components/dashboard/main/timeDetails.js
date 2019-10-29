import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { ItemCheckbox } from '../../../shared/UI/buttons';
import { BarTimesChart } from '../../../shared/UI/charts';
import { CrossIcon } from '../../../shared/UI/icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#efefef',
  },
  tabContainerSelected: {
    borderBottomWidth: 5,
    borderColor: '#005885',
  },
  tabText: {
    color: 'black',
    fontSize: 18,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
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
  subHeaderContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 5,
  },
});

// DICTIONARY
const allButtonLabel = 'All';

const tabDefinitions = [
  {
    key: 'categories',
    label: 'Categories', // DICTIONARY
  },
  {
    key: 'subjects',
    label: 'Subjects', // DICTIONARY
  },
];

const TimeDetails = ({
  itemsSummaries, selectedTab, title,
  idsSelection, allSelected, allItemsTotal,
  onPressTab, onToggleItem, onPressItem, onToggleAll, onPressClearItem,
}) => {
  const { key, selectedId } = selectedTab;

  const tabs = (
    <View style={styles.tabsContainer}>
      {tabDefinitions.map((tabDef, index) => (
        <TouchableOpacity
          style={{ flex: 1 }}
          key={index.toString()}
          onPress={() => onPressTab(tabDef.key)}
        >
          <View
            style={[
              styles.tabContainer,
              tabDef.key === key && styles.tabContainerSelected,
            ]}
          >
            <Text style={styles.tabText}>
              {tabDef.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  let header = null;
  if (title) {
    header = (
      <View style={styles.headerContainer}>
        <CrossIcon
          color="black"
          onPress={onPressClearItem}
        />
        <Text style={styles.headerText}>
          {title}
        </Text>
      </View>
    );
  }

  const allButton = (
    <ItemCheckbox
      text={allButtonLabel}
      checked={allSelected}
      onPress={onToggleAll}
    />
  );

  const useNameWithCategory = key === 'subjects';
  const itemPressEnabled = key === 'categories' && selectedId == null;

  return (
    <View style={styles.container}>
      {tabs}
      {header}
      {itemsSummaries && itemsSummaries.length > 0 && (
        <View style={styles.subHeaderContainer}>
          {allButton}
        </View>
      )}
      <BarTimesChart
        itemsSummaries={itemsSummaries}
        idsSelection={idsSelection}
        allItemsTotal={allItemsTotal}
        itemPressEnabled={itemPressEnabled}
        onToggleItem={onToggleItem}
        onPressItem={onPressItem}
        nameKey={useNameWithCategory ? 'nameWithCategory' : 'name'}
      />
    </View>
  );
};

export default TimeDetails;
