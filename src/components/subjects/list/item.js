import React from 'react';
import {
  StyleSheet, View, TouchableHighlight, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 1,
    paddingRight: 10,
    paddingLeft: 25,
    minHeight: 38,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  selectedContainer: {
    backgroundColor: colors.selectedSubject,
  },
  unselectedContainer: {
    backgroundColor: 'white',
  },
  detail: {
    flex: 1,
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
        underlayColor={colors.selectedSubjectUnderlay}
        activeOpacity={0.5}
        delayPressIn={0}
        delayPressOut={0}
      >
        <View
          style={[
            styles.container,
            isSelected ? styles.selectedContainer : styles.unselectedContainer,
          ]}
        >
          {detail}
          <Icon
            containerStyle={styles.chevronContainer}
            name="chevron-right"
            type="feather"
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default SubjectItem;
