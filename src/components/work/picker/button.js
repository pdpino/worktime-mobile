import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from '../styles';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minWidth: 200,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'black',
    marginBottom: 5,
  },
  subjectName: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  textDisabled: {
    color: 'gray',
  },
});

class PickerButton extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      selectedSubjectName, disabled,
    } = this.props;

    return nextProps.selectedSubjectName !== selectedSubjectName
      || nextProps.disabled !== disabled;
  }

  render() {
    const {
      selectedSubjectName, disabled,
    } = this.props;

    return (
      <View style={[commonStyles.box, styles.container]}>
        <Text style={[styles.label, disabled && styles.textDisabled]}>
          {i18n.t('workPlayer.chooseSubject')}
        </Text>
        <Text style={[styles.subjectName, disabled && styles.textDisabled]}>
          {selectedSubjectName || i18n.t('none')}
        </Text>
      </View>
    );
  }
}

export default PickerButton;
