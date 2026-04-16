import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useWsStatusIndicatorTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    dot: {
      width: theme.spacing['spacing-sm'],
      height: theme.spacing['spacing-sm'],
      borderRadius: theme.cornerRad['corner-rad-full'],
    },
    container: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingHorizontal: theme.spacing['spacing-sm'],
      paddingVertical: theme.spacing['spacing-xs'],
      borderRadius: theme.cornerRad['corner-rad-full'],
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
  });

  return { styles };
};
