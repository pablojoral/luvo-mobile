import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useReportScanButtonTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
      padding: theme.spacing['spacing-md'],
      backgroundColor: theme.surfaceColor['surface-button'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-secondary'],
      borderRadius: theme.cornerRad['corner-rad-md'],
    },
    info: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
  });

  return { styles };
};
