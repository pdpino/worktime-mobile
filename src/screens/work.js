import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkPlayer from '../containers/work/player';
import headerOptions from './header';
import i18n from '../shared/i18n';

const Stack = createNativeStackNavigator();

export default function WorkStack() {
  return (
    <Stack.Navigator initialRouteName="base-workPlayer" {...headerOptions}>
      <Stack.Screen
        name="base-workPlayer"
        component={WorkPlayer}
        options={{ title: i18n.t('work') }}
      />
    </Stack.Navigator>
  );
}
