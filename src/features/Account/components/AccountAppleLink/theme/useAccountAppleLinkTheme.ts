import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAccountAppleLinkTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingVertical: theme.spacing['spacing-md'],
      ...theme.shadowCard,
    },
    textColumn: {
      flex: 1,
      gap: theme.spacing['spacing-xxs'],
    },
    linkedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
  });

  return { styles, theme };
};
