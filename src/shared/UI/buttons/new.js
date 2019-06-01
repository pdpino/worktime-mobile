import React from 'react';
import ActionButton from 'react-native-action-button';

const NewButton = ({ disabled, onPress }) => {
  let handlePress = onPress;
  let activeOpacity = 0.2;
  let buttonColor = '#3B84B5';

  if (disabled) {
    handlePress = () => {};
    activeOpacity = 1;
    buttonColor = '#bdbdbd';
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
