import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useSettingsMenuItemTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      paddingVertical: theme.spacing['spacing-xs'],
      paddingHorizontal: theme.spacing['spacing-sm'],
    },
    label: {
      flex: 1,
    },
  });

  return { styles, theme };
};
