import React from 'react';
import {Image, View} from 'react-native';

const CircleImage = ({
  containerStyle,
  imageSize,
  imageStyle = {},
  imageSource,
}) => {
  return (
    <View style={containerStyle}>
      <Image
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize / 2,
          ...imageStyle,
        }}
        source={imageSource}
        resizeMode="cover"
      />
    </View>
  );
};

export default CircleImage;
