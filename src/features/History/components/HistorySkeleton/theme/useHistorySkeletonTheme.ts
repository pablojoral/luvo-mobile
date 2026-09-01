import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useHistorySkeletonTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingTop: theme.spacing['spacing-lg'],
    },
    statsCard: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      padding: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-xs'],
      ...theme.shadowCard,
    },
    monthHeader: {
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.spacing['spacing-xs'],
      paddingHorizontal: theme.spacing['spacing-xs'],
    },
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
      gap: theme.spacing['spacing-xs'],
    },
  });

  return { styles, iconSize: theme.spacing['spacing-xxxl'] };
};
