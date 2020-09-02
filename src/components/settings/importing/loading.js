import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import commonStyles from './styles';
import { colors } from '../../../shared/styles';

const LoadingView = ({ isLoadingPreview }) => (
  isLoadingPreview ? (
    <View style={commonStyles.row}>
      <ActivityIndicator
        color={colors.spinner}
        size="large"
      />
    </View>
  ) : null
);

export default LoadingView;
