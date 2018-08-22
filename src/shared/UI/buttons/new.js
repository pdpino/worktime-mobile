import React from 'react';
import ActionButton from 'react-native-action-button';

const NewButton = ({ onPress }) => (
  <ActionButton
    offsetX={20}
    buttonColor="#008c8b"
    onPress={onPress}
  />
);

export default NewButton;
