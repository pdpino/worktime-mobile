import React from 'react';
import {
  StyleSheet, View, Text, ActivityIndicator,
} from 'react-native';
import { prettyDaysAgo, prettyDuration } from '../../../shared/dates';
import i18n from '../../../shared/i18n';
import { colors } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    marginBottom: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    flex: 0,
    fontSize: 16,
    color: 'black',
  },
  loading: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

const SubjectTimesSummary = ({
  lastSession, timeTotal, timeEffective, isLoading,
}) => {
  const loadingWheel = (
    <View style={styles.loading}>
      <ActivityIndicator color={colors.spinner} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>
          {i18n.t('times.totalTime')}
        </Text>
        <Text style={styles.text}>
          {i18n.t('times.effectiveTime')}
        </Text>
        <Text style={styles.text}>
          {i18n.t('times.lastWorked')}
        </Text>
      </View>
      {isLoading ? loadingWheel : (
        <View style={styles.column}>
          <Text style={styles.text}>
            {prettyDuration(timeTotal)}
          </Text>
          <Text style={styles.text}>
            {prettyDuration(timeEffective)}
          </Text>
          <Text style={styles.text}>
            {prettyDaysAgo(lastSession && lastSession.timestampStart, { addSuffix: true })}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SubjectTimesSummary;
