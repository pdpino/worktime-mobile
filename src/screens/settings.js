import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsMenu from '../containers/settings/menu';
import Profile from '../containers/settings/profile';
import Exporting from '../containers/settings/exporting';
import Importing from '../containers/settings/importing';
import headerOptions from './header';
import i18n from '../shared/i18n';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="base-menu" {...headerOptions}>
      <Stack.Screen
        name="base-menu"
        component={SettingsMenu}
        options={{ title: i18n.t('settings') }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ title: i18n.t('profile') }}
      />
      <Stack.Screen
        name="exporting"
        component={Exporting}
        options={{ title: i18n.t('porting.exportData') }}
      />
      <Stack.Screen
        name="importing"
        component={Importing}
        options={{ title: i18n.t('porting.importData') }}
      />
    </Stack.Navigator>
  );
}
