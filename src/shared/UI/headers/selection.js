import React from 'react';
import { StyleSheet } from 'react-native';
import { CrossIcon } from '../icons';
import HeaderActions from './actions';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 25,
  },
});

export const getSelectionHeaderParams = ({
  amountSelected, actions, handleUnselection,
}) => ({
  title: amountSelected.toString(),
  headerBackVisible: false,
  headerLeft: () => (
    <CrossIcon
      containerStyle={styles.iconContainer}
      onPress={handleUnselection}
    />
  ),
  headerRight: () => <HeaderActions actions={actions} />,
  headerStyle: {
    backgroundColor: colors.darkBlue,
  },
});

export const revertHeaderParams = ({
  title, actions, back,
}) => ({
  title,
  headerBackVisible: !!back,
  headerLeft: () => null,
  headerRight: actions && (() => <HeaderActions actions={actions} />),
  // HACK: copied from screens/header.js // FIXME!!
  headerStyle: {
    backgroundColor: colors.mainBlue,
  },
  headerTintColor: 'white',
});
