import i18n from 'i18n-js';
import React from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.evenLighterGray,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 1,
    marginLeft: 'auto',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  icon: {
    marginLeft: 5,
  },
});

const GoToWorkSessions = ({ count, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
  >
    <View style={styles.row}>
      <Text style={styles.text}>
        {i18n.t('entities.nWorkSessions', { count })}
      </Text>
      <Icon
        containerStyle={styles.icon}
        name="chevron-right"
        type="feather"
        size={25}
        color="black"
      />
    </View>
  </TouchableOpacity>
);

export default GoToWorkSessions;
