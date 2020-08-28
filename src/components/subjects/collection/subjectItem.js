import React from 'react';
import {
  StyleSheet, View, TouchableHighlight, Text,
} from 'react-native';
import { AssignableIcon } from '../../../shared/UI/icons/assignable';
import { colors, getLightColor } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 2,
  },
  selectedContainer: {
    backgroundColor: colors.selectedSubject,
  },
  unselectedContainer: {
    backgroundColor: 'transparent',
  },
  detail: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 10,
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
});

class SubjectItem extends React.PureComponent {
  render() {
    const {
      subject, isSelected, categoryColor, onPress, onLongPress,
      hideDescription, littleAir,
    } = this.props;

    const detail = (
      <View style={styles.detail}>
        <Text style={styles.name}>
          {subject.name}
        </Text>
        {!hideDescription && subject.description && (
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
          <AssignableIcon
            name={subject.name}
            icon={subject.icon}
            size={26}
            color={getLightColor(categoryColor)}
            containerStyle={{ marginVertical: littleAir ? 0 : 5 }}
          />
          {detail}
        </View>
      </TouchableHighlight>
    );
  }
}

export default SubjectItem;
