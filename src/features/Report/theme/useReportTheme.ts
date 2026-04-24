import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useReportTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    flex: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
    },
    sectionLabel: {
      marginBottom: theme.spacing['spacing-xs'],
    },
    scanButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
      padding: theme.spacing['spacing-md'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-secondary'],
      borderRadius: theme.cornerRad['corner-rad-md'],
    },
    entityCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
      padding: theme.spacing['spacing-md'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-secondary'],
      borderRadius: theme.cornerRad['corner-rad-md'],
      backgroundColor: theme.surfaceColor['surface-secondary'],
    },
    entityCardInfo: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
    clearButton: {
      padding: theme.spacing['spacing-xs'],
    },
    subjectOptions: {
      gap: theme.spacing['spacing-xs'],
    },
    subjectOption: {
      padding: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-secondary'],
      borderRadius: theme.cornerRad['corner-rad-md'],
    },
    subjectOptionSelected: {
      borderColor: theme.borderColor['border-primary'],
      backgroundColor: theme.surfaceColor['surface-secondary'],
    },
    descriptionInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    fieldError: {
      marginTop: theme.spacing['spacing-xxs'],
    },
    errorText: {
      alignSelf: 'flex-start',
    },
    footer: {
      padding: theme.spacing['spacing-xl'],
      paddingBottom: theme.spacing['spacing-max'],
    },
  });

  return { styles, theme };
};
