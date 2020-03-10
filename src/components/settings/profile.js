import React from 'react';
import {
  StyleSheet, View, Text, TextInput, Button,
} from 'react-native';
import i18n from '../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formItem: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    padding: 10,
  },
  inputName: { },
  inputDescription: {
    height: 100,
  },
  button: {
    marginTop: 5,
  },
});

const formScope = { scope: 'formFields' };

const Profile = ({
  deviceName, onChangeDeviceName, onSubmit,
}) => {
  const deviceNameInput = (
    <View style={styles.formItem}>
      <Text style={styles.label}>
        {i18n.t('deviceName', formScope)}
      </Text>
      <TextInput
        style={[styles.input, styles.inputName]}
        value={deviceName}
        placeholder={i18n.t('shortName', formScope)}
        onChangeText={onChangeDeviceName}
      />
    </View>
  );

  const submitText = i18n.t('save');
  const submitButton = (
    <View style={[styles.formItem, styles.button]}>
      <Button
        title={submitText}
        onPress={onSubmit}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {deviceNameInput}
      {submitButton}
    </View>
  );
};


export default Profile;
