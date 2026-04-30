import { StyleSheet } from 'react-native';
import { Colors } from 'theme/constants/colors';
import { useTheme } from 'theme/hooks/useTheme';

export const useReportScanButtonTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
      padding: theme.spacing['spacing-md'],
      backgroundColor: Colors['colors-lavender-100'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: Colors['colors-lavender-300'],
      borderRadius: theme.cornerRad['corner-rad-md'],
    },
    label: {
      flex: 1,
    },
  });

  return { styles };
};
