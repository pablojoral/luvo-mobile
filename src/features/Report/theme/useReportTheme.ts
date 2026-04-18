import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useReportTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    content: {
      flex: 1,
      padding: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-md'],
    },
    descriptionInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    errorText: {
      alignSelf: 'flex-start',
    },
    footer: {
      padding: theme.spacing['spacing-xl'],
      paddingBottom: theme.spacing['spacing-max'],
    },
  });

  return { styles };
};
