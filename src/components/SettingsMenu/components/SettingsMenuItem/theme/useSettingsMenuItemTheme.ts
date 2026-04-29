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
    // flex: 1 pushes the trailing icon to the right edge
    label: {
      flex: 1,
    },
  });

  return { styles, theme };
};
