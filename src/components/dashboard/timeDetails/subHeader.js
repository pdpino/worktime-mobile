import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import Legend from './legend';
import { ItemCheckbox } from '../../../shared/UI/buttons';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
});

const SubHeader = ({
  nItems, isLoading, allSelected, onToggleAll,
}) => {
  if (isLoading || nItems === 0) {
    return null;
  }

  const allButton = (
    <ItemCheckbox
      text={i18n.t('all')}
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
};

export default React.memo(SubHeader);
