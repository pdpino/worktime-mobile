import React from 'react';
import { CrossIcon } from '../icons';
import HeaderActions from './actions';
import commonStyles from './styles';

const getSelectionHeaderParams = ({
  amountSelected, actions, handleUnselection,
}) => ({
  title: amountSelected.toString(),
  headerLeft: (
    <CrossIcon
      containerStyle={commonStyles.iconContainer}
      onPress={handleUnselection}
    />
  ),
  headerRight: <HeaderActions actions={actions} />,
  headerStyle: {
    backgroundColor: '#005885',
  },
});

export default getSelectionHeaderParams;
