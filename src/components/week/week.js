import React from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet,
} from 'react-native';
import WeekViewLib from 'react-native-week-view';
import { colors } from '../../shared/styles';
import IconOrText from './item';

const styles = StyleSheet.create({
  header: {
    alignItems: 'stretch',
    backgroundColor: colors.lightBlue,
    elevation: 1,
    borderColor: colors.mainBlue,
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
  },
  eventContainer: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  todayContainer: {
    flex: 1,
    paddingTop: 4,
    borderColor: colors.darkBlue,
    borderBottomWidth: 3,
    borderWidth: 1,
  },
  todayText: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

const Spinner = ({ style }) => (
  <ActivityIndicator
    size="large"
    style={style}
    color={colors.spinner}
  />
);

const TodayHeader = ({ formattedDate }) => (
  <View style={styles.todayContainer}>
    <Text style={styles.todayText}>{formattedDate}</Text>
  </View>
);

const WeekViewWrapper = React.forwardRef(({
  nDays, selectedDate, workSessions, isProcessing, onPressEvent, onSwipePrev,
}, ref) => (
  <WeekViewLib
    ref={ref}
    isRefreshing={isProcessing}
    RefreshComponent={Spinner}
    formatDateHeader="dd D"
    events={workSessions}
    numberOfDays={nDays}
    selectedDate={selectedDate}
    headerStyle={styles.header}
    headerTextStyle={styles.headerText}
    hoursInDisplay={16}
    startHour={8}
    locale={null}
    onEventPress={onPressEvent}
    EventComponent={IconOrText}
    TodayHeaderComponent={TodayHeader}
    allowOverlapSeconds={60}
    prependMostRecent
    eventContainerStyle={styles.eventContainer}
    onSwipePrev={onSwipePrev}
  />
));

export default WeekViewWrapper;
