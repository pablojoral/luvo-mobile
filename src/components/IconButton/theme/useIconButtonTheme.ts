import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { IconSize, SurfaceColor } from 'theme/types/Theme';

interface UseIconButtonThemeParams {
  iconSize: IconSize;
  surfaceColor: SurfaceColor;
}

export const useIconButtonTheme = ({ iconSize, surfaceColor }: UseIconButtonThemeParams) => {
  const theme = useTheme();

  const containerStyle: ViewStyle = useMemo(() => {
    const size = theme.iconSize[iconSize] + 16;
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.surfaceColor[surfaceColor],
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadowCard,
    };
  }, [iconSize, surfaceColor, theme]);

  return { containerStyle };
};
