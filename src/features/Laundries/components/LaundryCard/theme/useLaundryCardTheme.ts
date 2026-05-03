import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: theme.navBarHeight + theme.spacing['spacing-md'],
      left: theme.spacing['spacing-md'],
      right: theme.spacing['spacing-md'],
    },
  });

  return { styles, theme };
};
