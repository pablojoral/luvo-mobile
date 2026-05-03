import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { ButtonSize, ButtonVariant } from 'theme/types/Theme';

import { borderColorMap, spacingMap, surfaceColorMap } from './constants';

interface ButtonThemeParams {
  variant: ButtonVariant;
  size: ButtonSize;
  rounded?: boolean;
  fullWidth?: boolean;
  alignLeft?: boolean;
}

export const useButtonTheme = ({ variant, size, rounded, fullWidth, alignLeft }: ButtonThemeParams) => {
  const theme = useTheme();

  const contentContainerStyle: ViewStyle = useMemo(() => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: alignLeft ? 'flex-start' : 'center',
      borderWidth: theme.borderWidth['border-width-xs'],
      borderRadius: rounded ? theme.cornerRad['corner-rad-full'] : theme.cornerRad['corner-rad-lg'],
      backgroundColor: theme.surfaceColor[surfaceColorMap[variant]],
      borderColor: theme.borderColor[borderColorMap[variant]],
      padding: theme.spacing[spacingMap[variant][size]],
    };
  }, [rounded, variant, size, alignLeft, theme]);

  const contentStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing['spacing-xs'],
  };

  const containerStyle: ViewStyle = useMemo(() => {
    return fullWidth
      ? {
          flexGrow: 1,
          flexShrink: 1,
        }
      : {};
  }, [fullWidth]);

  return {
    containerStyle,
    contentContainerStyle,
    contentStyle,
  };
};
