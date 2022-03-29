import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../containers/dashboard';
import headerOptions from './header';
import i18n from '../shared/i18n';

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator initialRouteName='base-main' {...headerOptions}>
      <Stack.Screen
        name='base-main'
        component={Dashboard}
        options={{ title: i18n.t('dashboard') }}
      />
    </Stack.Navigator>
  );
}
