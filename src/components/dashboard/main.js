import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment'; // TODO: hide moment
import { CalendarPicker } from '../../shared/UI/pickers';
import { prettyDuration } from '../../shared/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

// REFACTOR: date range selector as a separate component

// DICTIONARY
const timeTotalLabel = 'Total';
const timeEffectiveLabel = 'Effective';

const Dashboard = ({
  timeTotal, timeEffective, initialDate, endingDate,
  onChangeInitialDate, onChangeEndingDate,
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
          From
        </Text>
        <CalendarPicker
          date={initialDate}
          maxDate={endingDate}
          onDayPress={day => onChangeInitialDate(day.dateString)}
        />
      </View>
      <View>
        <Text>
          To
        </Text>
        <CalendarPicker
          date={endingDate}
          minDate={initialDate}
          maxDate={moment()}
          onDayPress={day => onChangeEndingDate(day.dateString)}
        />
      </View>
    </View>
  );
};

export default Dashboard;
