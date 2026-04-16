import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { BorderColor, SurfaceColor } from 'theme/types/Theme';

interface ButtonThemeParams {
  surfaceColor: SurfaceColor;
  borderColor: BorderColor;
  fullWidth: boolean;
  disabled: boolean;
}

export const useTagTheme = ({ surfaceColor, borderColor, fullWidth, disabled }: ButtonThemeParams) => {
  const theme = useTheme();

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing['spacing-xxs'],
      borderWidth: 1,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: disabled ? theme.surfaceColor['surface-disabled'] : theme.surfaceColor[surfaceColor],
      borderColor: disabled ? theme.borderColor['border-disabled'] : theme.borderColor[borderColor],
      paddingVertical: theme.spacing['spacing-xs'],
      paddingHorizontal: theme.spacing['spacing-sm'],
      ...(fullWidth ? { flexGrow: 1, flexShrink: 1 } : { alignSelf: 'flex-start' }),
    };
  }, [theme, surfaceColor, borderColor, fullWidth, disabled]);

  return {
    containerStyle,
  };
};
