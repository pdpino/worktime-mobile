import React from 'react';
import {
  View, Text, Animated, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  bar: {
    alignSelf: 'center',
    height: 22,
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
    const { values, colors } = this.props;

    const bars = values.map((value, idx) => {
      const { width, text } = value;
      const currentWidth = new Animated.Value(0);
      Animated.timing(currentWidth, { toValue: width }).start();
      return (
        <Animated.View
          key={idx.toString()}
          style={[styles.bar, {
            backgroundColor: colors[idx],
            width: currentWidth,
          }]}
        >
          <Text style={styles.insideText}>
            {text}
          </Text>
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
