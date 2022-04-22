import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { BarTimesChart } from '../../../shared/UI/charts';
import { BackIcon } from '../../../shared/UI/icons';
import { TabsPicker } from '../../../shared/UI/pickers';
import { colors } from '../../../shared/styles';
import i18n from '../../../shared/i18n';
import SubHeader from './subHeader';
import { colorPalette } from '../legend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.mainBlue,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
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

const tabsDefinition = [
  {
    key: 'categories',
    getLabel: () => i18n.t('entities.categories'),
  },
  {
    key: 'subjects',
    getLabel: () => i18n.t('entities.subjects'),
  },
];

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
      <TabsPicker
        tabs={tabsDefinition}
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
          palette={colorPalette}
          listProps={{
            scrollEnabled: false,
          }}
        />
      )}
    </View>
  );
};

export default TimeDetails;
