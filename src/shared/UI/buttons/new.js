import React from 'react';
import ActionButton from 'react-native-action-button';
import { colors } from '../../styles';

const NewButton = ({ disabled, onPress }) => {
  let handlePress = onPress;
  let activeOpacity = 0.2;
  let buttonColor = colors.mainBlue;

  if (disabled) {
    handlePress = () => {};
    activeOpacity = 1;
    buttonColor = colors.lightGray;
  }

  return (
    <ActionButton
      offsetX={20}
      buttonColor={buttonColor}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      useNativeFeedback={false}
    />
  );
};

export default NewButton;
