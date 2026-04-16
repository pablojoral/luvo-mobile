import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle, AccessibilityProps } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { FontColor, FontSize } from 'theme/types/Theme';
import { useTheme } from 'theme/hooks/useTheme';
import { IconName, icons } from './types';

export type SvgIconProps = Omit<SvgProps, 'width' | 'height'> & {
  name: IconName;
  size?: FontSize;
  color?: FontColor;
  style?: ViewStyle;
} & AccessibilityProps;

const SvgIconComponent: React.FC<SvgIconProps> = ({
  name,
  size = 'font-size-sm',
  color = 'font-primary',
  style,
  accessibilityLabel,
  accessible = true,
  ...rest
}) => {
  const Icon = icons[name];

  const theme = useTheme();

  const sizeValue = theme.fontSize[size] || theme.fontSize['font-size-sm'];
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

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  placeholder: { opacity: 0 }, // invisible spacer to preserve layout
});

export const SvgIcon = memo(SvgIconComponent);
