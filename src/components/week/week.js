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
    textAlignVertical: 'center',
  },
  eventContainer: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  todayContainer: {
    flex: 1,
    borderColor: colors.darkBlue,
    borderWidth: 2,
  },
  todayText: {
    flex: 1,
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

const TodayHeader = ({ textStyle, formattedDate }) => (
  <View style={styles.todayContainer}>
    <Text style={[textStyle, styles.todayText]}>{formattedDate}</Text>
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
