import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryDetailsTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    content: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
  });

  return { styles, theme };
};
