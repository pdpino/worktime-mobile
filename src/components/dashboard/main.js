import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { prettyDate, prettyDuration } from '../../shared/utils';
import { CalendarPicker } from '../../shared/UI/pickers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';

const Dashboard = ({
  timeTotal, timeEffective, initialDate, endingDate,
}) => {
  const effectivePercentage = timeTotal > 0 ? (timeEffective / timeTotal * 100).toFixed(1) : 0;

  return (
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
      <View>
        <Text>
          {`From ${prettyDate(initialDate)} to ${prettyDate(endingDate)}`}
        </Text>
      </View>
      <CalendarPicker />
    </View>
  );
};

export default Dashboard;
