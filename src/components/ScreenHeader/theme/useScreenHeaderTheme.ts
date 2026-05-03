import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useScreenHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-sm'],
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    backButton: {
      width: theme.spacing['spacing-xxxl'],
      height: theme.spacing['spacing-xxxl'],
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-background'],
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles, theme };
};
