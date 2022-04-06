import React from 'react';
import SettingsMenu from '../containers/settings/menu';
import Profile from '../containers/settings/profile';
import Exporting from '../containers/settings/exporting';
import Importing from '../containers/settings/importing';
import i18n from '../shared/i18n';

export default function createSettingsStack(Stack) {
  return (
    <Stack.Group>
      <Stack.Screen
        name="settings-menu"
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
    </Stack.Group>
  );
}
