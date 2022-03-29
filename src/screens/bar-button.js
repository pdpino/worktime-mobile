import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

// DEPRECATED: deleteme (after upgrade to react-navigation v6)

// NOTE: This component is (almost) copied from
// react-navigation-tabs/src/views/BottomTabBar
// It changes the `hitSlop` prop in `TouchableWithoutFeedback`,
// setting `right: 0` and `left: 0`, to avoid the weird press area.

// eslint-disable-next-line react/prefer-stateless-function
class TouchableWithoutFeedbackWrapper extends React.Component {
  render() {
    const {
      route,
      focused,
      onPress,
      onLongPress,
      testID,
      accessibilityLabel,
      accessibilityRole,
      accessibilityStates,
      ...rest
    } = this.props;

    const hitSlop = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 5,
    };

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onLongPress={onLongPress}
        testID={testID}
        hitSlop={hitSlop}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityStates={accessibilityStates}
      >
        <View {...rest} />
      </TouchableWithoutFeedback>
    );
  }
}

export default TouchableWithoutFeedbackWrapper;
