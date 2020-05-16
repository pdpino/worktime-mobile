import React from 'react';
import WeekViewLib from 'react-native-week-view';
import { colors, getLightColor } from '../../shared/styles';

class WeekView extends React.PureComponent {
  render() {
    const {
      workSessions, nDays, selectedDate,
    } = this.props;

    const events = (workSessions || []).map((workSession) => {
      const { subject } = workSession;
      const { category } = subject;
      const color = category ? category.color : 'gray'; // HACK: default hardcoded
      return {
        id: workSession.id,
        description: subject.name,
        startDate: workSession.getLocalStartDate(),
        endDate: workSession.getLocalEndDate(),
        color: getLightColor(color),
      };
    });

    return (
      <WeekViewLib
        formatDateHeader="dd D"
        events={events}
        numberOfDays={nDays}
        selectedDate={selectedDate}
        headerStyle={{
          backgroundColor: colors.lightBlue,
        }}
        headerTextColor="white"
        hoursInDisplay={18}
        startHour={8}
      />
    );
  }
}

export default WeekView;
