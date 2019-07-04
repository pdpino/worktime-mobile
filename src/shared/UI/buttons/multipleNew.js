import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';

const MultipleNewButton = ({ disabled, actions }) => {
  let activeOpacity = 0.2;
  let buttonColor = '#3B84B5';

  if (disabled) {
    activeOpacity = 1;
    buttonColor = '#bdbdbd';
  }

  const buttons = actions.map((action, index) => (
    <ActionButton.Item
      key={index.toString()}
      buttonColor="#71b3e7"
      title={action.title}
      onPress={action.handlePress}
      textContainerStyle={{ height: 'auto' }}
      textStyle={{ fontSize: 18 }}
    >
      <Icon name="plus" type="entypo" color="white" />
    </ActionButton.Item>
  ));

  return (
    <ActionButton
      offsetX={20}
      buttonColor={buttonColor}
      activeOpacity={activeOpacity}
      useNativeFeedback={false}
    >
      {!disabled && buttons}
    </ActionButton>
  );
};

export default MultipleNewButton;
