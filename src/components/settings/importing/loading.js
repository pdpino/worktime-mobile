import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import commonStyles from './styles';

const LoadingView = ({ isLoadingPreview }) => (
  isLoadingPreview ? (
    <View style={commonStyles.row}>
      <ActivityIndicator
        size="large"
      />
    </View>
  ) : null
);

export default LoadingView;
