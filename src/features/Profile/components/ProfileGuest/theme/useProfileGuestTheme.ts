import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useProfileGuestTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: theme.topInset + theme.spacing['spacing-xl'],
      paddingBottom: theme.navBarHeight + theme.spacing['spacing-xl'],
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing['spacing-md'],
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
  });

  return { styles };
};
