import React from 'react';
import {
  StyleSheet, View, Text, FlatList,
} from 'react-native';
import { timeToPrettyDate, prettyDaysAgo } from '../../../shared/dates';
import i18n from '../../../shared/i18n';
import commonStyles from './styles';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 20,
  },
  title: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
  },
  empty: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 18,
    fontStyle: 'italic',
  },
});

const KnownDevices = ({ knownDevices }) => {
  const data = Object.entries(knownDevices || {}).map(([device, lastImported], index) => ({
    id: index,
    device,
    lastImported,
  }));

  const title = (
    <Text style={styles.title}>
      {i18n.t('porting.lastImported')}
      :
    </Text>
  );

  const empty = (
    <Text style={styles.empty}>
      {i18n.t('never')}
    </Text>
  );

  const renderKnownDevice = ({ item }) => {
    const { device, lastImported } = item;

    const daysAgo = prettyDaysAgo(lastImported, { addSuffix: true });
    const date = `${timeToPrettyDate(lastImported)} (${daysAgo})`;
    return (
      <View style={styles.row}>
        <Text style={styles.text}>
          {device}
        </Text>
        <Text style={styles.text}>
          {date}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      style={[commonStyles.box, styles.container]}
      renderItem={renderKnownDevice}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={title}
      ListEmptyComponent={empty}
    />
  );
};

export default React.memo(KnownDevices);
