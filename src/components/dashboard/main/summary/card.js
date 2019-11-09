import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    marginHorizontal: 7,
    marginVertical: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
    // HACK: minHeight hardcoded, equal to height when displaying text
    minHeight: 71,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

const SummaryCard = ({
  isLoading, children,
}) => (
  <View style={styles.container}>
    {isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    ) : children}
  </View>
);

export default SummaryCard;