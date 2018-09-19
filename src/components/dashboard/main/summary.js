import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { prettyDuration } from '../../../shared/utils';

const styles = StyleSheet.create({
  container: { },
});

// DICTIONARY
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';

const Summary = ({ timeTotal, timeEffective, effectivePercentage }) => (
  <View style={styles.container}>
    <Text>
      {`${timeTotalLabel} ${prettyDuration(timeTotal)}`}
    </Text>
    <Text>
      {`${timeEffectiveLabel} ${prettyDuration(timeEffective)}`}
    </Text>
    <Text>
      {`${effectivePercentage} %`}
    </Text>
  </View>
);

export default Summary;
