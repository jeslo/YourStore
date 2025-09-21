import React, { useState } from 'react';
import { Image, View, StyleProp, ImageStyle } from 'react-native';

export interface SmartImageProps {
  uri?: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

const placeholderImage = require('../assets/no-image.png');

const SmartImage: React.FC<SmartImageProps> = ({
  uri,
  style,
  resizeMode = 'cover',
}) => {
  const [error, setError] = useState(false);

  return (
    <View style={style}>
      {!error && uri ? (
        <Image
          source={{ uri }}
          style={style}
          resizeMode={resizeMode}
          onError={() => setError(true)}
        />
      ) : (
        <Image source={placeholderImage} style={style} resizeMode="contain" />
      )}
    </View>
  );
};

export default SmartImage;
