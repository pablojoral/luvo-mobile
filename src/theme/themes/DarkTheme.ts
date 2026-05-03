import { DarkTheme as RNNavigationDarkTheme } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import { ThemeConstants } from '../types/Theme';

export const DarkThemeConstants: ThemeConstants = {
  navBarHeight: 108,

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
    'surface-primary': Colors['colors-grey-600'],
    'surface-secondary': Colors['colors-grey-700'],
    'surface-button': Colors['colors-lavender-700'],
    'surface-tertiary': Colors['colors-grey-500'],
    'surface-background': Colors['colors-grey-800'],
    'surface-surface': Colors['colors-grey-700'],
    'surface-disabled': Colors['colors-grey-500'],
    'surface-invert': Colors['colors-lavender-700'],
    'surface-success': Colors['colors-green-900'],
    'surface-success-subtle': Colors['colors-green-700'],
    'surface-error': Colors['colors-red-900'],
    'surface-error-subtle': Colors['colors-red-800'],
    'surface-warning': Colors['colors-yellow-900'],
    'surface-warning-subtle': Colors['colors-yellow-900'],
    'surface-tertiary-subtle': Colors['colors-grey-600'],
    'surface-status-available': Colors['colors-green-900'],
    'surface-status-available-subtle': Colors['colors-green-700'],
    'surface-status-in-use': Colors['colors-rose-900'],
    'surface-status-in-use-subtle': Colors['colors-rose-800'],
    'surface-status-out-of-order': Colors['colors-grey-500'],
    'surface-status-out-of-order-subtle': Colors['colors-grey-600'],
    'surface-status-maintenance': Colors['colors-yellow-900'],
    'surface-status-maintenance-subtle': Colors['colors-yellow-900'],
    'surface-transparent': 'transparent',
    'surface-dark': Colors['colors-grey-900'],
  },

  shadowBox: {
    shadowColor: Colors['colors-black'],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 8,
  },
  shadowCard: {
    shadowColor: Colors['colors-black'],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  shadowFloating: {
    shadowColor: Colors['colors-black'],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 12,
    elevation: 8,
  },
  shadowBottomNav: {
    shadowColor: Colors['colors-black'],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },

  fontFamily: {
    poppins: 'Poppins',
  },

  borderWidth: {
    'border-width-none': 0,
    'border-width-xs': 1,
    'border-width-sm': 2,
    'border-width-md': 3,
    'border-width-lg': 4,
    'border-width-xl': 5,
    'border-width-xxl': 6,
    'border-width-xxxl': 8,
  },

  iconSize: {
    'icon-size-xs': 14,
    'icon-size-sm': 18,
    'icon-size-md': 20,
    'icon-size-lg': 22,
    'icon-size-xl': 24,
    'icon-size-xxl': 26,
    'icon-size-xxxl': 32,
  },
  cornerRad: {
    'corner-rad-none': 0,
    'corner-rad-sm': 4,
    'corner-rad-md': 8,
    'corner-rad-lg': 12,
    'corner-rad-xl': 16,
    'corner-rad-xxl': 24,
    'corner-rad-xxxl': 32,
    'corner-rad-full': 9999,
  },

  borderColor: {
    'border-primary': Colors['colors-grey-400'],
    'border-secondary': Colors['colors-grey-500'],
    'border-disabled': Colors['colors-grey-600'],
    'border-placeholder': Colors['colors-grey-300'],
    'border-invert': Colors['colors-grey-200'],
    'border-error': Colors['colors-red-500'],
    'border-transparent': 'transparent',
  },

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
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
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
    'font-primary': Colors['colors-grey-25'],
    'font-secondary': Colors['colors-lavender-400'],
    'font-highlight': Colors['colors-rose-400'],
    'font-light': Colors['colors-grey-300'],
    'font-disabled': Colors['colors-grey-400'],
    'font-placeholder': Colors['colors-grey-300'],
    'font-invert': Colors['colors-grey-900'],
    'font-error': Colors['colors-red-500'],
    'font-success': Colors['colors-green-300'],
    'font-warning': Colors['colors-yellow-300'],
    'font-status-available': Colors['colors-green-300'],
    'font-status-in-use': Colors['colors-rose-400'],
    'font-status-out-of-order': Colors['colors-grey-300'],
    'font-status-maintenance': Colors['colors-yellow-300'],
  },

  letterSpacing: {
    label: 1.5,
  },
  componentSize: {
    fab: 56,
    iconContainer: 48,
    cardMaxWidth: 320,
    descriptionInput: 120,
    laundryImage: 112,
  },
  zIndex: {
    overlay: 9999,
    message: 10000,
    background: -9999,
    camera: -10000,
  },
  overlayColor: {
    modal: 'rgba(0,0,0,0.6)',
    dimmer: 'rgba(0,0,0,0.7)',
    backdrop: 'rgba(0,0,0,0.6)',
    glassButton: 'rgba(255,255,255,0.15)',
  },
  navigation: {
    ...RNNavigationDarkTheme,
    colors: {
      ...RNNavigationDarkTheme.colors,
      background: Colors['colors-grey-800'],
    },
  },
};
