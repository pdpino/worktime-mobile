import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  selectedContainer: {
    backgroundColor: '#c4eeff',
  },
  unselectedContainer: {
    backgroundColor: 'white',
  },
  detail: {
    flex: 2,
    flexDirection: 'column',
    margin: 1,
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
});

class SubjectItem extends React.PureComponent {
  render() {
    const {
      subject, isSelected, onPress, onLongPress,
    } = this.props;

    const name = (
      <Text style={styles.name}>
        {subject.name}
      </Text>
    );

    const description = (
      <Text style={styles.description}>
        {subject.description}
      </Text>
    );

    return (
      <View
        style={[
          styles.container,
          isSelected ? styles.selectedContainer : styles.unselectedContainer,
        ]}
      >
        <TouchableOpacity
          style={styles.detail}
          onPress={() => onPress(subject.id)}
          onLongPress={() => onLongPress(subject.id)}
        >
          {name}
          {description}
        </TouchableOpacity>
      </View>
    );
  }
}

export default SubjectItem;
