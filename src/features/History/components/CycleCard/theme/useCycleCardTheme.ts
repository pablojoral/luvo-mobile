import { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useCycleCardTheme = (machineType: 'washing_machine' | 'dryer') => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-lg'],
      paddingVertical: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
      marginBottom: theme.spacing['spacing-xs'],
      ...theme.shadowCard,
    },
    info: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
  });

  const iconBoxStyle: ViewStyle = useMemo(() => ({
    width: theme.spacing['spacing-xxxl'],
    height: theme.spacing['spacing-xxxl'],
    borderRadius: theme.cornerRad['corner-rad-lg'],
    backgroundColor: machineType === 'washing_machine'
      ? theme.surfaceColor['surface-background']
      : theme.surfaceColor['surface-secondary'],
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  }), [machineType, theme]);

  return { styles, iconBoxStyle };
};
