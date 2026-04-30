import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useSettingsSeparatorTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    separator: {
      height: theme.borderWidth['border-width-xs'],
      backgroundColor: theme.borderColor['border-secondary'],
      marginHorizontal: theme.spacing['spacing-md'],
    },
  });

  return { styles };
};
