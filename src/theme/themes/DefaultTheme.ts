import { Colors } from '../constants/colors';
import { ThemeConstants } from '../types/Theme';
import { DefaultTheme as RNNavigationTheme } from '@react-navigation/native';

export const DefaultThemeConstants: ThemeConstants = {
  navBarHeight: 108,
  // Surface themes
  spacing: {
    'spacing-none': 0,
    'spacing-xxxs': 2,
    'spacing-xxs': 4,
    'spacing-xs': 8,
    'spacing-sm': 12,
    'spacing-md': 16,
    'spacing-lg': 20,
    'spacing-xl': 24,
    'spacing-xxl': 32,
    'spacing-xxxl': 40,
    'spacing-xxxxl': 48,
    'spacing-max': 96,
  },
  surfaceColor: {
    'surface-primary': Colors['colors-lavender-50'],
    'surface-secondary': Colors['colors-rose-50'],
    'surface-tertiary': Colors['colors-grey-100'],
    'surface-background': Colors['colors-lavender-200'],
    'surface-surface': Colors['colors-lavender-300'],
    'surface-disabled': Colors['colors-lavender-600'],
    'surface-invert': Colors['colors-lavender-500'],
    'surface-success': Colors['colors-green-50'],
    'surface-error': Colors['colors-red-50'],
    'surface-warning': Colors['colors-yellow-50'],
    'surface-transparent': 'transparent',
  },
  shadowBox: {
    shadowColor: Colors['colors-black'],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Border themes
  borderWidth: {
    'border-width-none': 0,
    'border-width-xxs': 0,
    'border-width-xs': 1,
    'border-width-sm': 2,
    'border-width-md': 3,
    'border-width-lg': 4,
    'border-width-xl': 5,
    'border-width-xxl': 6,
    'border-width-xxxl': 8,
  },
  cornerRad: {
    'corner-rad-none': 0,
    'corner-rad-sm': 4,
    'corner-rad-md': 8,
    'corner-rad-lg': 12,
    'corner-rad-xl': 16,
    'corner-rad-xxl': 24,
    'corner-rad-xxxl': 32,
    'corner-rad-full': 9999, // Full radius for circular corners
  },
  borderColor: {
    'border-primary': Colors['colors-grey-300'],
    'border-secondary': Colors['colors-grey-100'],
    'border-disabled': Colors['colors-grey-100'],
    'border-placeholder': Colors['colors-grey-400'],
    'border-invert': Colors['colors-white'],
    'border-error': Colors['colors-red-300'],
    'border-transparent': 'transparent',
  },

  // Text themes
  fontSize: {
    'font-size-xs': 12,
    'font-size-sm': 14,
    'font-size-md': 16,
    'font-size-lg': 18,
    'font-size-xl': 20,
    'font-size-xxl': 24,
    'font-size-xxxl': 28,
    'font-size-xxxxl': 32,
  },
  fontWeight: {
    light: '300',
    regular: '400',
    semibold: '600',
  },
  lineHeight: {
    'line-height-xs': 16,
    'line-height-sm': 18,
    'line-height-md': 20,
    'line-height-lg': 22,
    'line-height-xl': 24,
    'line-height-xxl': 28,
    'line-height-xxxl': 32,
  },
  fontColor: {
    'font-primary': Colors['colors-grey-900'],
    'font-secondary': Colors['colors-lavender-500'],
    'font-highlight': Colors['colors-rose-500'],
    'font-light': Colors['colors-grey-400'],
    'font-disabled': Colors['colors-grey-400'],
    'font-placeholder': Colors['colors-grey-400'],
    'font-invert': Colors['colors-white'],
    'font-error': Colors['colors-red-600'],
    'font-success': Colors['colors-green-500'],
    'font-warning': Colors['colors-yellow-600'],
  },
  navigation: {
    ...RNNavigationTheme,
    colors: {
      ...RNNavigationTheme.colors,
      background: Colors['colors-white'],
    },
  },
};
