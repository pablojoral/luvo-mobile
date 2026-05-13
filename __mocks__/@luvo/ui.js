/**
 * Manual mock for @luvo/ui.
 *
 * @luvo/ui is a file: dep that bundles React Native components. Jest cannot
 * resolve the package through the normal node_modules resolution because it
 * needs native-module-aware transforms for each RN primitive inside the
 * bundle. Stubbing here avoids the entire transform chain while still
 * satisfying imports in components and hooks that re-export from @luvo/ui.
 *
 * Keep this in sync with the real @luvo/ui public API as exports are added.
 */
// ---------------------------------------------------------------------------
// Theme stubs
// A minimal BaseTheme-shaped object — enough for useTheme() spread to succeed
// without throwing undefined-access errors in tests.
// ---------------------------------------------------------------------------
const MOCK_THEME = {
  spacing: {
    'spacing-none': 0, 'spacing-xxxs': 2, 'spacing-xxs': 4,
    'spacing-xs': 6, 'spacing-sm': 8, 'spacing-md': 12,
    'spacing-lg': 16, 'spacing-xl': 20, 'spacing-xxl': 24,
    'spacing-xxxl': 32, 'spacing-xxxxl': 40, 'spacing-max': 48,
  },
  surfaceColor: {
    'surface-primary': '#fff', 'surface-secondary': '#f5f5f5',
    'surface-button': '#6750A4', 'surface-tertiary': '#eee',
    'surface-background': '#fafafa', 'surface-surface': '#fff',
    'surface-disabled': '#ccc', 'surface-invert': '#000',
    'surface-transparent': 'transparent', 'surface-dark': '#1a1a1a',
    'surface-success': '#4caf50', 'surface-success-subtle': '#e8f5e9',
    'surface-error': '#f44336', 'surface-error-subtle': '#ffebee',
    'surface-warning': '#ff9800', 'surface-warning-subtle': '#fff3e0',
    'surface-tertiary-subtle': '#f3e5f5',
    'surface-status-available': '#4caf50',
    'surface-status-available-subtle': '#e8f5e9',
    'surface-status-in-use': '#2196f3',
    'surface-status-in-use-subtle': '#e3f2fd',
    'surface-status-out-of-order': '#f44336',
    'surface-status-out-of-order-subtle': '#ffebee',
    'surface-status-maintenance': '#ff9800',
    'surface-status-maintenance-subtle': '#fff3e0',
  },
  shadowBox: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  shadowCard: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 1 },
  shadowFloating: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },
  shadowBottomNav: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  fontFamily: { poppins: 'Poppins' },
  fontSize: {
    'font-size-xs': 10, 'font-size-sm': 12, 'font-size-md': 14,
    'font-size-lg': 16, 'font-size-xl': 18, 'font-size-xxl': 20,
    'font-size-xxxl': 24, 'font-size-xxxxl': 32,
  },
  fontWeight: {
    light: '300', regular: '400', medium: '500',
    semibold: '600', bold: '700', extrabold: '800',
  },
  lineHeight: {
    'line-height-xs': 14, 'line-height-sm': 16, 'line-height-md': 20,
    'line-height-lg': 22, 'line-height-xl': 24, 'line-height-xxl': 28,
    'line-height-xxxl': 32,
  },
  fontColor: {
    'font-primary': '#1a1a1a', 'font-secondary': '#757575',
    'font-highlight': '#6750A4', 'font-light': '#fff',
    'font-disabled': '#bdbdbd', 'font-placeholder': '#9e9e9e',
    'font-invert': '#fff', 'font-success': '#2e7d32',
    'font-error': '#c62828', 'font-warning': '#e65100',
    'font-status-available': '#2e7d32', 'font-status-in-use': '#1565c0',
    'font-status-out-of-order': '#c62828', 'font-status-maintenance': '#e65100',
  },
  cornerRad: {
    'corner-rad-none': 0, 'corner-rad-sm': 4, 'corner-rad-md': 8,
    'corner-rad-lg': 12, 'corner-rad-xl': 16, 'corner-rad-xxl': 24,
    'corner-rad-xxxl': 32, 'corner-rad-full': 9999,
  },
  borderColor: {
    'border-primary': '#1a1a1a', 'border-secondary': '#9e9e9e',
    'border-disabled': '#e0e0e0', 'border-placeholder': '#bdbdbd',
    'border-invert': '#fff', 'border-error': '#f44336',
    'border-transparent': 'transparent',
  },
  borderWidth: {
    'border-width-none': 0, 'border-width-xs': 0.5, 'border-width-sm': 1,
    'border-width-md': 1.5, 'border-width-lg': 2, 'border-width-xl': 3,
    'border-width-xxl': 4, 'border-width-xxxl': 6,
  },
  iconSize: {
    'icon-size-xs': 12, 'icon-size-sm': 16, 'icon-size-md': 20,
    'icon-size-lg': 24, 'icon-size-xl': 28, 'icon-size-xxl': 32,
    'icon-size-xxxl': 40, 'icon-size-xxxxl': 48, 'icon-size-xxxxxl': 56,
    'icon-size-xxxxxxl': 64, 'icon-size-128': 128, 'icon-size-160': 160,
    'icon-size-192': 192, 'icon-size-256': 256,
  },
  overlayColor: {
    modal: 'rgba(0,0,0,0.5)', dimmer: 'rgba(0,0,0,0.3)',
    backdrop: 'rgba(0,0,0,0.2)', glassButton: 'rgba(255,255,255,0.15)',
  },
  componentSize: {
    fab: 56, iconContainer: 40, cardMaxWidth: 320,
    descriptionInput: 120, laundryImage: 200,
  },
};

// ---------------------------------------------------------------------------
// ThemeProvider — renders children directly, no context plumbing needed for tests
// ---------------------------------------------------------------------------
function ThemeProvider({ children }) {
  return children;
}

// ---------------------------------------------------------------------------
// useBaseTheme — returns the mock theme object
// ---------------------------------------------------------------------------
function useBaseTheme() {
  return MOCK_THEME;
}

// ---------------------------------------------------------------------------
// Component stubs — render nothing but satisfy import resolution
// ---------------------------------------------------------------------------
const Separator = jest.fn(() => null);
Separator.displayName = 'Separator';

const StepIndicator = jest.fn(() => null);
StepIndicator.displayName = 'StepIndicator';

const Switch = jest.fn(() => null);
Switch.displayName = 'Switch';

module.exports = {
  ThemeProvider,
  defaultTheme: MOCK_THEME,
  darkTheme: MOCK_THEME,
  useBaseTheme,
  Separator,
  StepIndicator,
  Switch,
};
