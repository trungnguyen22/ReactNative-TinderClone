import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AppColorPallete, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../theme';

const FullscreenLoading = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.75,
      backgroundColor: 'white',
    }}>
    <ActivityIndicator size="large" color={AppColorPallete.light.primary} />
  </View>
);

export default FullscreenLoading;
