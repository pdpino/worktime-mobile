import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from '../styles';
import i18n from '../../../shared/i18n';
import { AssignableIcon } from '../../../shared/UI/icons/assignable';
import { getLightColor } from '../../../shared/styles';

const styles = StyleSheet.create({
  containerWithSelection: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 10,
    minWidth: 200,
  },
  containerWithoutSelection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chooseSubject: {
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
    color: 'black',
  },
  namesContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  categoryName: {
    fontWeight: 'bold',
  },
  subjectName: {
    color: 'black',
    fontSize: 16,
  },
  subjectNameDisabled: {
    color: 'gray',
  },
});

const DEFAULT_COLOR = 'gray';

class PickerButton extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      selected, disabled,
    } = this.props;

    return nextProps.selected !== selected
      || nextProps.disabled !== disabled;
  }

  render() {
    const {
      selected, disabled,
    } = this.props;

    if (!selected) {
      return (
        <View style={[commonStyles.box, styles.containerWithoutSelection]}>
          <Text style={styles.chooseSubject}>
            {i18n.t('workPlayer.chooseSubject')}
          </Text>
        </View>
      );
    }

    const { subject, category } = selected;
    const colorName = category ? category.color : DEFAULT_COLOR;
    const color = getLightColor(colorName);

    return (
      <View
        style={[
          commonStyles.box,
          styles.containerWithSelection,
          { opacity: disabled ? 0.5 : 1 },
        ]}
      >
        <AssignableIcon
          name={subject.name}
          icon={subject.icon}
          color={color}
          size={30}
        />
        <View style={styles.namesContainer}>
          <Text style={[styles.categoryName, { color }]}>
            {category ? category.name : i18n.t('entities.noCategory')}
          </Text>
          <Text
            style={[
              styles.subjectName,
              disabled && styles.subjectNameDisabled,
            ]}
          >
            {subject.name}
          </Text>
        </View>
      </View>
    );
  }
}

export default PickerButton;
