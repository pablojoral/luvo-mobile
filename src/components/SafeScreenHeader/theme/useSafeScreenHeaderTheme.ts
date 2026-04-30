import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useSafeScreenHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      paddingTop: theme.topInset,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
  });

  return { styles };
};
