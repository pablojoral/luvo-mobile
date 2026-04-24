import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useRootStackNavigatorTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    fill: { flex: 1 },
  });

  return { styles, theme };
};
