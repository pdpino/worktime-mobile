import React from 'react';
import {
  StyleSheet, View, Text, ActivityIndicator,
} from 'react-native';
import { prettyDaysAgo, prettyDuration } from '../../shared/dates';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  loading: {
    height: 84, // HACK: value hardcoded, equal to height when displaying text
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const SubjectInfo = ({
  lastSession, timeTotal, timeEffective, nDaysWorked, isLoading,
}) => {
  const title = (
    <Text style={styles.title}>
      {i18n.t('summary')}
    </Text>
  );

  const lastWorkedInfo = (
    <Text style={styles.text}>
      {i18n.t('times.lastWorked')}
      {': '}
      {prettyDaysAgo(lastSession && lastSession.timestampStart)}
    </Text>
  );

  const timeTotalInfo = (
    <Text style={styles.text}>
      {i18n.t('times.totalTime')}
      {': '}
      {prettyDuration(timeTotal)}
    </Text>
  );

  const timeEffectiveInfo = (
    <Text style={styles.text}>
      {i18n.t('times.effectiveTime')}
      {': '}
      {prettyDuration(timeEffective)}
    </Text>
  );

  const nDaysWorkedInfo = (
    <Text style={styles.text}>
      {i18n.t('times.daysWorked')}
      {': '}
      {nDaysWorked}
    </Text>
  );

  const loadingWheel = (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={styles.container}>
      {title}
      {isLoading ? loadingWheel : (
        <View>
          {lastWorkedInfo}
          {timeTotalInfo}
          {timeEffectiveInfo}
          {nDaysWorkedInfo}
        </View>
      )}
    </View>
  );
};

export default SubjectInfo;
