import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useTabsScreenTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    fill: { flex: 1 },
  });

  return { styles, theme };
};
