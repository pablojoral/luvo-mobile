import {
  BorderColor,
  ButtonSize,
  ButtonVariant,
  FontColor,
  FontSize,
  FontWeight,
  Spacing,
  SurfaceColor,
} from 'theme/types/Theme';
import { TextStyle } from 'react-native';

export const surfaceColorMap: Record<ButtonVariant, SurfaceColor> = {
  primary: 'surface-invert',
  secondary: 'surface-secondary',
  tertiary: 'surface-background',
  destructive: 'surface-error',
  link: 'surface-transparent',
};

export const borderColorMap: Record<ButtonVariant, BorderColor> = {
  primary: 'border-invert',
  secondary: 'border-secondary',
  tertiary: 'border-placeholder',
  destructive: 'border-error',
  link: 'border-transparent',
};

export const spacingMap: Record<ButtonVariant, Record<ButtonSize, Spacing>> = {
  primary: {
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    xl: 'spacing-xl',
  },
  secondary: {
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    xl: 'spacing-xl',
  },
  tertiary: {
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    xl: 'spacing-xl',
  },
  link: {
    xs: 'spacing-none',
    sm: 'spacing-none',
    md: 'spacing-none',
    xl: 'spacing-none',
  },
  destructive: {
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    xl: 'spacing-xl',
  },
};

export const textColorMap: Record<ButtonVariant, FontColor> = {
  primary: 'font-primary',
  secondary: 'font-primary',
  tertiary: 'font-secondary',
  destructive: 'font-invert',
  link: 'font-highlight',
};

export const fontSizeMap: Record<ButtonSize, FontSize> = {
  xs: 'font-size-xs',
  sm: 'font-size-sm',
  md: 'font-size-md',
  xl: 'font-size-xxl',
};

export const fontWeightMap: Record<ButtonVariant, Record<ButtonSize, FontWeight>> = {
  primary:     { xs: 'light', sm: 'light', md: 'regular', xl: 'semibold' },
  secondary:   { xs: 'light', sm: 'light', md: 'regular', xl: 'semibold' },
  tertiary:    { xs: 'light', sm: 'light', md: 'regular', xl: 'semibold' },
  destructive: { xs: 'light', sm: 'light', md: 'regular', xl: 'semibold' },
  link:        { xs: 'semibold', sm: 'semibold', md: 'semibold', xl: 'semibold' },
};

export const textDecorationMap: Partial<Record<ButtonVariant, TextStyle['textDecorationLine']>> = {
  link: 'underline',
};
