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
const React = require('react');

// Use React.createElement with host primitives so react-test-renderer can
// reconcile the tree without trying to call RN class-based mocks as functions.
const Text = jest.fn(({ children }) => React.createElement('Text', null, children));
Text.displayName = 'Text';

const Button = jest.fn(({ label }) => React.createElement('View', null, React.createElement('Text', null, label)));
Button.displayName = 'Button';

const ActivityIndicator = jest.fn(() => React.createElement('View', null));
ActivityIndicator.displayName = 'ActivityIndicator';

const TextInput = jest.fn(() => React.createElement('TextInput', null));
TextInput.displayName = 'TextInput';

const Separator = jest.fn(() => null);
Separator.displayName = 'Separator';

const StepIndicator = jest.fn(() => null);
StepIndicator.displayName = 'StepIndicator';

const Switch = jest.fn(() => null);
Switch.displayName = 'Switch';

// Components migrated from local src/components/ to @luvo/ui in Phase 2.
const ActionModal = jest.fn(() => null);
ActionModal.displayName = 'ActionModal';

const AuthModeToggle = jest.fn(() => null);
AuthModeToggle.displayName = 'AuthModeToggle';

const AuthRequiredScreen = jest.fn(() => null);
AuthRequiredScreen.displayName = 'AuthRequiredScreen';

const AvailabilityTag = jest.fn(() => null);
AvailabilityTag.displayName = 'AvailabilityTag';

const BottomSheet = jest.fn(({ children }) => React.createElement('View', null, children));
BottomSheet.displayName = 'BottomSheet';

const ConcurrencyTag = jest.fn(() => null);
ConcurrencyTag.displayName = 'ConcurrencyTag';

const Icon = jest.fn(() => null);
Icon.displayName = 'Icon';

const IconButton = jest.fn(() => null);
IconButton.displayName = 'IconButton';

const Label = jest.fn(({ children }) => React.createElement('View', null, children));
Label.displayName = 'Label';

const LaundryMapMarker = jest.fn(() => null);
LaundryMapMarker.displayName = 'LaundryMapMarker';

const Loader = jest.fn(() => React.createElement('View', null));
Loader.displayName = 'Loader';

const LocationLabel = jest.fn(() => null);
LocationLabel.displayName = 'LocationLabel';

const MachineCard = jest.fn(() => null);
MachineCard.displayName = 'MachineCard';

const PillSelector = jest.fn(() => null);
PillSelector.displayName = 'PillSelector';

const SafeScreenHeader = jest.fn(() => null);
SafeScreenHeader.displayName = 'SafeScreenHeader';

const ScreenHeader = jest.fn(() => null);
ScreenHeader.displayName = 'ScreenHeader';

const SelectInput = jest.fn(() => null);
SelectInput.displayName = 'SelectInput';

const SettingsMenu = jest.fn(() => null);
SettingsMenu.displayName = 'SettingsMenu';

const SocialAuth = jest.fn(() => null);
SocialAuth.displayName = 'SocialAuth';

const SvgIcon = jest.fn(() => null);
SvgIcon.displayName = 'SvgIcon';

const SvgImage = jest.fn(() => null);
SvgImage.displayName = 'SvgImage';

const Tag = jest.fn(({ children }) => React.createElement('View', null, children));
Tag.displayName = 'Tag';

const TagButton = jest.fn(() => null);
TagButton.displayName = 'TagButton';

const TimeTag = jest.fn(() => null);
TimeTag.displayName = 'TimeTag';

const ErrorBoundary = jest.fn(({ children }) =>
  React.createElement(React.Fragment, null, children)
);
ErrorBoundary.displayName = 'ErrorBoundary';

const NAV_FONTS = {
  regular: { fontFamily: 'sans-serif', fontWeight: 'normal' },
  medium: { fontFamily: 'sans-serif-medium', fontWeight: 'normal' },
  bold: { fontFamily: 'sans-serif', fontWeight: '600' },
  heavy: { fontFamily: 'sans-serif', fontWeight: '700' },
};

function useTheme() {
  return { ...MOCK_THEME, topInset: 0, bottomInset: 0, navBarHeight: 108, letterSpacing: { label: 1.5 }, zIndex: { overlay: 9999, message: 10000, background: -9999, camera: -10000 }, navigation: { dark: false, fonts: NAV_FONTS, colors: { primary: '#6750A4', background: '#fff', card: '#fff', text: '#1a1a1a', border: '#e0e0e0', notification: '#f44336' } } };
}

module.exports = {
  ThemeProvider,
  defaultTheme: MOCK_THEME,
  darkTheme: MOCK_THEME,
  useBaseTheme,
  useTheme,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  Separator,
  StepIndicator,
  Switch,
  // Phase 2 additions
  ActionModal,
  AuthModeToggle,
  AuthRequiredScreen,
  AvailabilityTag,
  BottomSheet,
  ConcurrencyTag,
  Icon,
  IconButton,
  Label,
  LaundryMapMarker,
  Loader,
  LocationLabel,
  MachineCard,
  PillSelector,
  SafeScreenHeader,
  ScreenHeader,
  SelectInput,
  SettingsMenu,
  SocialAuth,
  SvgIcon,
  SvgImage,
  Tag,
  TagButton,
  TimeTag,
  ErrorBoundary,
  // Colors is a flat color-key dictionary (not the theme object).
  // Keys match the real @luvo/ui Colors export so consumers like
  // useWsStatusIndicatorTheme can index Colors['colors-grey-300'] etc.
  Colors: {
    'colors-white': '#FEFEFE',
    'colors-black': '#000000',
    'colors-semi-transparent': 'rgba(0, 0, 0, 0.5)',
    'colors-transparent': 'transparent',
    'colors-grey-25': '#f4f4f5',
    'colors-grey-50': '#eaeaeb',
    'colors-grey-100': '#d5d6d7',
    'colors-grey-200': '#abadb0',
    'colors-grey-300': '#828488',
    'colors-grey-400': '#585b61',
    'colors-grey-500': '#2f323a',
    'colors-grey-600': '#25282e',
    'colors-grey-700': '#1c1e22',
    'colors-grey-800': '#121417',
    'colors-grey-900': '#090a0b',
    'colors-lavender-25': '#fcfbfd',
    'colors-lavender-50': '#faf7fb',
    'colors-lavender-100': '#f6f0f8',
    'colors-lavender-200': '#eee2f2',
    'colors-lavender-300': '#e6d4ec',
    'colors-lavender-400': '#dec6e6',
    'colors-lavender-500': '#d6b8e0',
    'colors-lavender-600': '#ab93b3',
    'colors-lavender-700': '#806e86',
    'colors-lavender-800': '#554959',
    'colors-lavender-900': '#2a242c',
    'colors-rose-25': '#fdf6f7',
    'colors-rose-50': '#fbeef0',
    'colors-rose-100': '#f7dee2',
    'colors-rose-200': '#efbdc6',
    'colors-rose-300': '#e79ca9',
    'colors-rose-400': '#df7b8d',
    'colors-rose-500': '#d75b71',
    'colors-rose-600': '#ac485a',
    'colors-rose-700': '#813643',
    'colors-rose-800': '#56242d',
    'colors-rose-900': '#2b1216',
    'colors-green-25': '#f3fcf4',
    'colors-green-50': '#e6f9e6',
    'colors-green-100': '#c8f0cb',
    'colors-green-300': '#70d77a',
    'colors-green-500': '#00B300',
    'colors-green-700': '#117a12',
    'colors-green-900': '#0b4e0b',
    'colors-red-25': '#fff6f6',
    'colors-red-50': '#fbeef0',
    'colors-red-100': '#FFEDED',
    'colors-red-300': '#ff9b9b',
    'colors-red-500': '#FF5959',
    'colors-red-600': '#FF3B3B',
    'colors-red-800': '#b62424',
    'colors-red-900': '#7a1414',
    'colors-yellow-25': '#fffbf3',
    'colors-yellow-50': '#fbeef0',
    'colors-yellow-100': '#fff1c2',
    'colors-yellow-300': '#ffdf70',
    'colors-yellow-500': '#FFCD00',
    'colors-yellow-600': '#e6b800',
    'colors-yellow-800': '#997a00',
    'colors-yellow-900': '#664e00',
  },
};
