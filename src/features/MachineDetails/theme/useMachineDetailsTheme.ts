import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import type { SurfaceColor } from '@luvo/ui';

export const useMachineDetailsTheme = (statusSurfaceColor: SurfaceColor) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    body: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
      overflow: 'hidden',
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
    },
    heroCard: {
      borderRadius: theme.cornerRad['corner-rad-xl'],
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-xxl'],
      gap: theme.spacing['spacing-sm'],
    },
    actions: {
      gap: theme.spacing['spacing-sm'],
    },
    notFound: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-md'],
    },
    notFoundText: {
      textAlign: 'center',
    },
  });

  const heroCardBg = useMemo(() => ({
    backgroundColor: theme.surfaceColor[statusSurfaceColor],
  }), [statusSurfaceColor, theme]);

  return { styles, heroCardBg, theme };
};
