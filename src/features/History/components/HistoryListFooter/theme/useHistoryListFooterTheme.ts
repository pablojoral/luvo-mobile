import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useHistoryListFooterTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-xl'],
    },
  });

  return { styles };
};
