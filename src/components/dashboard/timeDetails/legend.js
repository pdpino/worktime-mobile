import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import i18n from '../../../shared/i18n';
import { legendDefinition } from '../legend';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 5,
  },
  rectangle: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  text: {
    color: 'black',
  },
});

const Legend = () => (
  <View style={styles.container}>
    {legendDefinition.map(({ labelKey, color }, index) => (
      <View key={index.toString()} style={styles.item}>
        <View style={[styles.rectangle, { backgroundColor: color }]} />
        <Text style={styles.text}>
          {i18n.t(labelKey)}
        </Text>
      </View>
    ))}
  </View>
);

export default React.memo(Legend);
