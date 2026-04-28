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

export const surfaceColorMap: Record<ButtonVariant, SurfaceColor> = {
  primary: 'surface-primary',
  secondary: 'surface-secondary',
  tertiary: 'surface-background',
  destructive: 'surface-error',
  link: 'surface-transparent',
};

export const borderColorMap: Record<ButtonVariant, BorderColor> = {
  primary: 'border-primary',
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
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    xl: 'spacing-xl',
  },
  destructive: {
    xs: 'spacing-xs',
    sm: 'spacing-sm',
    md: 'spacing-md',
    xl: 'spacing-xl',
  },
};

export const textColorMap: Record<ButtonVariant, FontColor> = {
  primary: 'font-invert',
  secondary: 'font-primary',
  tertiary: 'font-secondary',
  destructive: 'font-invert',
  link: 'font-primary',
};

export const fontSizeMap: Record<ButtonSize, FontSize> = {
  xs: 'font-size-xs',
  sm: 'font-size-sm',
  md: 'font-size-md',
  xl: 'font-size-xxl',
};

export const fontWeightMap: Record<ButtonSize, FontWeight> = {
  xs: 'regular',
  sm: 'medium',
  md: 'semibold',
  xl: 'bold',
};
