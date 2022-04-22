import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import i18n from '../../shared/i18n';
import { colors } from '../../shared/styles';
import { TabsPicker } from '../../shared/UI/pickers';

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  tabContainer: {
    backgroundColor: colors.lighterGray,
  },
});

const AVAILABLE_SPANS = [
  'days',
  'weeks',
  'months',
  'years',
];

const spansAsTabs = AVAILABLE_SPANS.map((span) => ({
  key: span,
  getLabel: () => i18n.t(`timeSpans.${span}`),
}));

const SpanSelector = ({
  spanSelected, changeTimeSpan,
}) => (
  <TabsPicker
    tabs={spansAsTabs}
    selectedTabKey={spanSelected}
    onPressTab={changeTimeSpan}
    containerStyle={styles.container}
    tabContainerStyle={styles.tabContainer}
  />
);

export default SpanSelector;
