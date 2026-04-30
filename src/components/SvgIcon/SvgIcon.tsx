import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle, AccessibilityProps } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { FontColor, IconSize } from 'theme/types/Theme';
import { useTheme } from 'theme/hooks/useTheme';
import { IconName, icons } from './types';

export type SvgIconProps = Omit<SvgProps, 'width' | 'height'> & {
  name: IconName;
  size?: IconSize;
  color?: FontColor;
  style?: ViewStyle;
} & AccessibilityProps;

const SvgIconComponent: React.FC<SvgIconProps> = ({
  name,
  size = 'icon-size-xl',
  color = 'font-primary',
  style,
  accessibilityLabel,
  accessible = true,
  ...rest
}) => {
  const Icon = icons[name];

  const theme = useTheme();

  const sizeValue = theme.iconSize[size] ?? theme.iconSize['icon-size-xl'];
  const colorValue = color ? theme.fontColor[color] : undefined;

  if (!Icon) {
    if (__DEV__) {
      console.warn(`[SvgIcon] Unknown icon name: "${name}"`);
    }
    // Render an empty placeholder to avoid crashes in production
    return <View style={[styles.placeholder, { width: sizeValue, height: sizeValue }, style]} />;
  }

  return (
    <View
      style={[styles.container, { width: sizeValue, height: sizeValue }, style]}
      accessibilityLabel={accessibilityLabel ?? name}
      accessible={accessible}
      accessibilityRole="image"
    >
      <Icon width={sizeValue} height={sizeValue} color={colorValue} {...rest} />
    </View>
  );
};

// Styling rule §5 exemption: these styles are purely structural layout values
// (justifyContent, alignItems, opacity) with no design tokens. There is no
// theme hook for this auto-generated SVG wrapper because no token would be
// referenced — placing them in a useSvgIconTheme hook would add indirection
// with zero design-token benefit. Dynamic values (size, color) are passed
// inline from the useTheme() call already present in the component body.
const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  placeholder: { opacity: 0 }, // invisible spacer to preserve layout
});

export const SvgIcon = memo(SvgIconComponent);
