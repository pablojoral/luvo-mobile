import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DefaultThemeConstants } from '../themes/DefaultTheme';
import { Theme } from '../types/Theme';

export const useTheme = () => {
  const { top, bottom } = useSafeAreaInsets();
  const theme: Theme = { ...DefaultThemeConstants, topInset: top, bottomInset: bottom };
  return theme;
};
