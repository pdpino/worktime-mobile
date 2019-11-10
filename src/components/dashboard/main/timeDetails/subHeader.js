import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { ItemCheckbox } from '../../../../shared/UI/buttons';
import { legendDefinition } from '../colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  legendContainer: {
    flexDirection: 'row',
  },
  legendItem: {
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
  legendText: {
    color: 'black',
  },
});

// DICTIONARY
const allButtonLabel = 'All';

class Legend extends React.PureComponent {
  render() {
    return (
      <View style={styles.legendContainer}>
        {legendDefinition.map(({ label, color }, index) => (
          <View key={index.toString()} style={styles.legendItem}>
            <View style={[styles.rectangle, { backgroundColor: color }]} />
            <Text style={styles.legendText}>
              {label}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}


/* SubHeader contains "all" button and legend */
class SubHeader extends React.PureComponent {
  render() {
    const {
      nItems, isLoading, allSelected, onToggleAll,
    } = this.props;

    if (isLoading || nItems === 0) {
      return null;
    }

    const allButton = (
      <ItemCheckbox
        text={allButtonLabel}
        checked={allSelected}
        onPress={onToggleAll}
      />
    );

    return (
      <View style={styles.container}>
        {allButton}
        <Legend />
      </View>
    );
  }
}

export default SubHeader;
