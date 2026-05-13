import { useBaseTheme } from '@luvo/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDarkModeStore } from 'stores/useDarkModeStore';

import { DarkThemeConstants } from '../themes/DarkTheme';
import { DefaultThemeConstants } from '../themes/DefaultTheme';
import { Theme } from '../types/Theme';

// MobileThemeExtras holds the fields that extend BaseTheme in luvo-mobile
// (navBarHeight, letterSpacing, zIndex, navigation). These are not part of the
// shared token contract and remain sourced from the local theme constants.
interface MobileThemeExtras {
  navBarHeight: number;
  letterSpacing: Theme['letterSpacing'];
  zIndex: Theme['zIndex'];
  navigation: Theme['navigation'];
}

const defaultExtras: MobileThemeExtras = {
  navBarHeight: DefaultThemeConstants.navBarHeight,
  letterSpacing: DefaultThemeConstants.letterSpacing,
  zIndex: DefaultThemeConstants.zIndex,
  navigation: DefaultThemeConstants.navigation,
};

const darkExtras: MobileThemeExtras = {
  navBarHeight: DarkThemeConstants.navBarHeight,
  letterSpacing: DarkThemeConstants.letterSpacing,
  zIndex: DarkThemeConstants.zIndex,
  navigation: DarkThemeConstants.navigation,
};

export const useTheme = () => {
  const { top, bottom } = useSafeAreaInsets();
  const darkMode = useDarkModeStore((state) => state.darkMode);
  // Base tokens (spacing, colors, typography, shadows, etc.) come from @luvo/ui
  // ThemeProvider, which is mounted in App.tsx and switches on darkModePreference.
  const base = useBaseTheme();
  const extras = darkMode ? darkExtras : defaultExtras;
  const theme: Theme = { ...base, ...extras, topInset: top, bottomInset: bottom };
  return theme;
};
