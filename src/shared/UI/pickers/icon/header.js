import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { iconsConfigByName } from '../../icons/assignable';
import { colors } from '../../../styles';
import i18n from '../../../i18n';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.evenLighterGray,
    borderBottomWidth: 1,
    borderColor: colors.lighterGray,
    marginBottom: 5,
    elevation: 1,
  },
  selectedIconContainer: {
    marginHorizontal: 20,
  },
  clearButton: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});

const SelectedIconHeader = ({
  icon, color, onPressIcon, onPressClear,
}) => {
  const iconConfig = icon && iconsConfigByName[icon];
  if (!iconConfig) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Icon
        containerStyle={styles.selectedIconContainer}
        raised
        reverse={false}
        onPress={onPressIcon}
        {...iconConfig}
        color={color}
        size={25}
        delayPressIn={0}
      />
      <Button
        icon={{
          name: 'clear',
          type: 'material',
          size: 15,
          color: 'red',
        }}
        titleStyle={{ color: 'red' }}
        buttonStyle={styles.clearButton}
        title={i18n.t('deletion.clear')}
        onPress={onPressClear}
        iconRight
      />
    </View>
  );
};

export default SelectedIconHeader;
