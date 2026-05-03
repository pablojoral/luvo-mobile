import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useStatsHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      padding: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-xxs'],
      ...theme.shadowCard,
    },
  });

  return { styles };
};
