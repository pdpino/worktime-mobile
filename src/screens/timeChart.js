import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeChart from '../containers/TimeChart';
import headerOptions from './header';
import i18n from '../shared/i18n';

const Stack = createNativeStackNavigator();

export default function TimeChartStack() {
  return (
    <Stack.Navigator initialRouteName="base-timeChart" {...headerOptions}>
      <Stack.Screen
        name="base-timeChart"
        component={TimeChart}
        options={{ title: i18n.t('timeChart') }}
      />
    </Stack.Navigator>
  );
}
