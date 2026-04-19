import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useProfileHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingVertical: theme.spacing['spacing-md'],
      paddingTop: theme.topInset + theme.spacing['spacing-xl'],
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xl'],
    },
    textContainer: {
      gap: theme.spacing['spacing-xs'],
    },
    iconContainer: {},
  });

  return { styles };
};
