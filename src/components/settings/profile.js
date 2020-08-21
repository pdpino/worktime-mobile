import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { TextField } from '../../shared/UI/inputs';
import { SubmitButton } from '../../shared/UI/buttons';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

const formScope = { scope: 'formFields' };

const Profile = ({
  deviceName, onChangeDeviceName, onSubmit,
}) => (
  <View style={styles.container}>
    <TextField
      label={i18n.t('deviceName', formScope)}
      value={deviceName}
      placeholder={i18n.t('shortName', formScope)}
      onChange={onChangeDeviceName}
    />
    <SubmitButton
      text={i18n.t('save')}
      onPress={onSubmit}
    />
  </View>
);


export default Profile;
