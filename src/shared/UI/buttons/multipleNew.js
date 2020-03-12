import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { colors } from '../../styles';

const MultipleNewButton = ({ disabled, actions }) => {
  let activeOpacity = 0.2;
  let buttonColor = colors.mainBlue;

  if (disabled) {
    activeOpacity = 1;
    buttonColor = colors.lightGray;
  }

  const buttons = actions.map((action, index) => (
    <ActionButton.Item
      key={index.toString()}
      buttonColor={action.color || colors.lightBlue}
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
