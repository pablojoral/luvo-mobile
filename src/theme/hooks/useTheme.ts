import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDarkModeStore } from 'stores/useDarkModeStore';

import { DarkThemeConstants } from '../themes/DarkTheme';
import { DefaultThemeConstants } from '../themes/DefaultTheme';
import { Theme } from '../types/Theme';

export const useTheme = () => {
  const { top, bottom } = useSafeAreaInsets();
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const constants = darkMode ? DarkThemeConstants : DefaultThemeConstants;
  const theme: Theme = { ...constants, topInset: top, bottomInset: bottom };
  return theme;
};
