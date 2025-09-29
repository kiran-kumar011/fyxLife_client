import React from 'react';
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

type TImageProps = {
  source: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  accessibilityLabel?: string;
};

const TImage = ({
  source,
  size = 40,
  style,
  resizeMode = 'cover',
  accessibilityLabel,
}: TImageProps) => {
  return (
    <Image
      source={source}
      style={[styles.base, { width: size, height: size }, style]}
      resizeMode={resizeMode}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
  },
});

export default TImage;
