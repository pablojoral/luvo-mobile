import { StyleSheet } from 'react-native';
import { Colors } from 'theme/constants/colors';
import { useTheme } from 'theme/hooks/useTheme';

export const useReportEntityCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
      padding: theme.spacing['spacing-md'],
      backgroundColor: Colors['colors-lavender-100'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: Colors['colors-rose-500'],
      borderRadius: theme.cornerRad['corner-rad-md'],
    },
    info: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
    clearButton: {
      padding: theme.spacing['spacing-xs'],
    },
  });

  return { styles };
};
