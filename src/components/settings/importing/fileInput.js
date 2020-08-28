import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { extractFilename } from '../../../shared/utils';
import commonStyles from './styles';
import i18n from '../../../shared/i18n';

const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 18,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  inputText: {
    alignSelf: 'center',
    fontSize: 16,
    margin: 5,
  },
  inputTextPresent: {
    color: 'black',
  },
  inputTextPlaceholder: {
    color: 'gray',
  },
});

const FileInput = ({ path, onPressFile }) => (
  <View style={commonStyles.row}>
    <Text style={styles.label}>
      {i18n.t('file')}
    </Text>
    <View style={[styles.inputContainer, commonStyles.box]}>
      <TouchableOpacity
        onPress={onPressFile}
        delayPressIn={0}
      >
        <Text
          style={[
            styles.inputText,
            path ? styles.inputTextPresent : styles.inputTextPlaceholder,
          ]}
        >
          {path ? extractFilename(path) : i18n.t('porting.selectFile')}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default FileInput;
