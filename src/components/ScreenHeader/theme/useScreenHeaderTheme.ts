import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useScreenHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-lg'],
      paddingHorizontal: theme.spacing['spacing-md'],
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    backButton: {
      padding: theme.spacing['spacing-xs'],
    },
    title: {
      flex: 1,
      textAlign: 'center',
    },
    spacer: {
      width: theme.fontSize['font-size-xxl'] + theme.spacing['spacing-xs'] * 2,
    },
  });

  return { styles };
};
