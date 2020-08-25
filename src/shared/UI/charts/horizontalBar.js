import React from 'react';
import {
  View, Text, Animated, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    marginTop: 5,
    height: 15,
  },
  insideText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    color: 'black',
  },
});

class HorizontalBar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.totalValue !== nextProps.totalValue
      || this.props.totalWidth !== nextProps.totalWidth;
  }

  render() {
    const { values, palette } = this.props;

    const bars = values.map((value, idx) => {
      const { width, text } = value;
      const currentWidth = new Animated.Value(0);
      Animated.timing(currentWidth, {
        toValue: width,
        useNativeDriver: false,
      }).start();
      return (
        <Animated.View
          key={idx.toString()}
          style={[styles.bar, {
            backgroundColor: palette[idx],
            width: currentWidth,
          }]}
        >
          {text && (
            <Text style={styles.insideText}>
              {text}
            </Text>
          )}
        </Animated.View>
      );
    });

    return (
      <View style={styles.container}>
        {bars}
      </View>
    );
  }
}

export default HorizontalBar;
