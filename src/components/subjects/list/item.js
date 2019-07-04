import React from 'react';
import {
  StyleSheet, View, TouchableHighlight, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
  selectedContainer: {
    backgroundColor: '#71b3e74A',
  },
  unselectedContainer: {
    backgroundColor: 'white',
  },
  detail: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 20,
    color: 'black',
  },
  description: {
    fontSize: 12,
    color: 'black',
    paddingLeft: 8,
  },
  chevronContainer: {
    justifyContent: 'center',
  },
});

class SubjectItem extends React.PureComponent {
  render() {
    const {
      subject, isSelected, onPress, onLongPress,
    } = this.props;

    const detail = (
      <View style={styles.detail}>
        <Text style={styles.name}>
          {subject.name}
        </Text>
        {subject.description && (
          <Text style={styles.description}>
            {subject.description}
          </Text>
        )}
      </View>
    );

    return (
      <TouchableHighlight
        onPress={() => onPress(subject.id)}
        onLongPress={() => onLongPress(subject.id)}
        underlayColor="#71b3e74A"
        activeOpacity={1}
      >
        <View
          style={[
            styles.container,
            isSelected ? styles.selectedContainer : styles.unselectedContainer,
          ]}
        >
          {detail}
          <View style={styles.chevronContainer}>
            <Icon
              name="chevron-right"
              type="feather"
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default SubjectItem;
