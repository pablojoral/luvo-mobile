import React, { memo } from 'react';
import { AccessibilityProps, StyleSheet, View, ViewStyle } from 'react-native';

import { ImageName, images } from './images';

import type { SvgProps } from 'react-native-svg';
export type SvgImageProps = SvgProps & {
  name: ImageName;
  height?: number;
  color?: string;
  style?: ViewStyle;
} & AccessibilityProps;

const SvgImageComponent: React.FC<SvgImageProps> = ({
  name,
  height,
  width,
  color,
  style,
  accessibilityLabel,
  accessible = true,
  ...rest
}) => {
  const Image = images[name];

  // If only one dimension is provided, leave the other undefined so
  // react-native-svg infers it from the SVG's viewBox (aspect ratio preserved).
  // If neither is provided, fall back to height=24.
  const resolvedHeight = height ?? (width !== undefined ? undefined : 24);
  const resolvedWidth = width;

  if (!Image) {
    if (__DEV__) {
      console.warn(`[SvgImage] Unknown image name: "${name}"`);
    }
    return <View style={[styles.placeholder, style]} />;
  }

  return (
    <View
      style={styles.container}
      accessibilityLabel={accessibilityLabel ?? name}
      accessible={accessible}
      accessibilityRole="image"
    >
      <Image height={resolvedHeight} width={resolvedWidth} color={color} {...rest} />
    </View>
  );
};

// Styling rule §5 exemption: these styles are purely structural layout values
// (justifyContent, alignItems, opacity) with no design tokens. There is no
// theme hook for this auto-generated SVG wrapper because no token would be
// referenced — placing them in a useSvgImageTheme hook would add indirection
// with zero design-token benefit.
const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  placeholder: { opacity: 0 },
});

export const SvgImage = memo(SvgImageComponent);
