import { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { FontColor } from 'theme/types/Theme';

export const useConcurrencyTagTheme = (color: FontColor) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
  });

  const dotStyle: ViewStyle = useMemo(() => {
    const size = theme.spacing['spacing-xs'];
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.fontColor[color],
    };
  }, [color, theme]);

  return { styles, dotStyle };
};
