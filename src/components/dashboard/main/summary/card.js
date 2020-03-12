import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '../../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.mainBlue,
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

let minHeight = 0;
const saveMinHeight = (event) => {
  minHeight = event.nativeEvent.layout.height;
};

const SummaryCard = ({
  isLoading, children,
}) => (
  <View
    style={[styles.container, isLoading && { minHeight }]}
    onLayout={saveMinHeight}
  >
    {isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    ) : children}
  </View>
);

export default SummaryCard;
