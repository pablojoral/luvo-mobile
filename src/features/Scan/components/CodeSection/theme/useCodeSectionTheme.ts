import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useCodeSectionTheme = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing['spacing-xxl'],
    },
    contentContainer: {
      gap: theme.spacing['spacing-md'],
    },
  });
  return { styles, theme };
};
