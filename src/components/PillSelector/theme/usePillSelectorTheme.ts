import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { SurfaceColor } from 'theme/types/Theme';

interface PillSelectorThemeParams {
  backgroundColor: SurfaceColor;
  thumbColor: SurfaceColor;
}

export const usePillSelectorTheme = ({ backgroundColor, thumbColor }: PillSelectorThemeParams) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    outerContainer: {
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor[backgroundColor],
      padding: theme.spacing['spacing-xxxs'],
    },
    container: {
      position: 'relative',
      justifyContent: 'center',
    },
    contentContainer: {
      flexDirection: 'row',
      position: 'relative',
    },
    thumb: {
      position: 'absolute',
      height: '100%',
      backgroundColor: theme.surfaceColor[thumbColor],
      borderRadius: theme.cornerRad['corner-rad-full'],
    },
    row: {
      flexDirection: 'row',
    },
    segment: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing['spacing-xs'],
    },
    label: {
      fontWeight: '600',
    },
  });

  return { styles, theme };
};
