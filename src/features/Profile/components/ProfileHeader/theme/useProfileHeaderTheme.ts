import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const AVATAR_SIZE = 64;

export const useProfileHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingTop: theme.topInset + theme.spacing['spacing-xs'],
      paddingBottom: theme.spacing['spacing-lg'],
    },
    textContainer: {
      flex: 1,
    },
  });

  return { styles, AVATAR_SIZE };
};
