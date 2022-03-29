import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeekView from '../containers/week';
import headerOptions from './header';
import i18n from '../shared/i18n';

const Stack = createNativeStackNavigator();

export default function WeekStack() {
  return (
    <Stack.Navigator initialRouteName='base-weekView' {...headerOptions}>
      <Stack.Screen
        name='base-weekView'
        component={WeekView}
        options={{ title: i18n.t('week') }}
      />
    </Stack.Navigator>
  );
}
