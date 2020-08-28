import React from 'react';
import {
  View, StyleSheet, ActivityIndicator, Dimensions,
} from 'react-native';
import WeekViewLib from 'react-native-week-view';
import { colors } from '../../shared/styles';
import IconOrText from './inner';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
// HACK: values hardcoded
const CONTAINER_HEIGHT = SCREEN_HEIGHT - 60;
const CONTAINER_WIDTH = SCREEN_WIDTH - 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: colors.lightBlue,
    elevation: 1,
  },
  loadingSpinner: {
    position: 'absolute',
    top: CONTAINER_HEIGHT / 2,
    right: CONTAINER_WIDTH / 2,
    zIndex: 1,
  },
});

const WeekViewWrapper = ({
  children, nDays, selectedDate, workSessions, isProcessing, onPressEvent,
}) => (
  <View style={styles.container}>
    {isProcessing && (
      <ActivityIndicator
        size="large"
        style={styles.loadingSpinner}
        color={colors.mainBlue}
      />
    )}
    <WeekViewLib
      formatDateHeader="dd D"
      events={workSessions}
      numberOfDays={nDays}
      selectedDate={selectedDate}
      headerStyle={styles.header}
      headerTextColor="white"
      hoursInDisplay={12}
      startHour={8}
      locale={null}
      onEventPress={onPressEvent}
      InnerComponent={IconOrText}
    />
    {children}
  </View>
);

export default WeekViewWrapper;
