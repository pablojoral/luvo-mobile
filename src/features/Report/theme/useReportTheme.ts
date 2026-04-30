import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';


export const useReportTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
    },
    flex: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
    },
    sectionLabel: {
      marginBottom: theme.spacing['spacing-xs'],
    },
    descriptionInput: {
      height: theme.componentSize.descriptionInput,
      textAlignVertical: 'top',
    },
    errorText: {
      alignSelf: 'flex-start',
    },
    footer: {
      backgroundColor: theme.surfaceColor['surface-background'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-sm'],
      paddingBottom: theme.spacing['spacing-xl'] + theme.bottomInset,
    },
  });

  return { styles, theme };
};
