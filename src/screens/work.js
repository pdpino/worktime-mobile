import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkPlayer from '../containers/work/player';
import headerOptions from './header';
import createSettingsStack from './settings';
import i18n from '../shared/i18n';
import { HeaderActions } from '../shared/UI/headers';

const Stack = createNativeStackNavigator();

export default function WorkStack() {
  return (
    <Stack.Navigator initialRouteName="base-workPlayer" {...headerOptions}>
      <Stack.Screen
        name="base-workPlayer"
        component={WorkPlayer}
        options={({ navigation }) => ({
          title: i18n.t('work'),
          headerRight: () => (
            <HeaderActions
              actions={[{
                icon: 'settings',
                handlePress: () => navigation.navigate('settings-menu'),
              }]}
            />
          ),
        })}
      />
      {createSettingsStack(Stack)}
    </Stack.Navigator>
  );
}
