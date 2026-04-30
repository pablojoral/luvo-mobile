import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAccountActionRowTheme = () => {
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
    label: {
      flex: 1,
    },
  });

  return { styles };
};
