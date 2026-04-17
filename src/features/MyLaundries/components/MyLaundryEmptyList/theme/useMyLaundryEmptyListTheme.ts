import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useMyLaundryEmptyListTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: { alignItems: 'center', gap: theme.spacing['spacing-md'] },
    emptyText: { textAlign: 'center' },
  });
  return styles;
};
