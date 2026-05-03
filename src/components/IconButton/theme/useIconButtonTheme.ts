import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { IconSize } from 'theme/types/Theme';

interface UseIconButtonThemeParams {
  iconSize: IconSize;
}

export const useIconButtonTheme = ({ iconSize }: UseIconButtonThemeParams) => {
  const theme = useTheme();

  const containerStyle: ViewStyle = useMemo(() => {
    const size = theme.iconSize[iconSize] + 16;
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.surfaceColor['surface-primary'],
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadowCard,
    };
  }, [iconSize, theme]);

  return { containerStyle };
};
