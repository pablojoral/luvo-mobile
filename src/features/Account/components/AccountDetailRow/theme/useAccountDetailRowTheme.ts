import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAccountDetailRowTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingVertical: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-xxs'],
      ...theme.shadowCard,
    },
  });

  return { styles };
};
