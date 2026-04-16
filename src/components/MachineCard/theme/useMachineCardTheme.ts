// theme/useLaundryDetailsModalTheme.ts
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useMachineCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing['spacing-sm'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-lg'],
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
    },
    infoContainer: {
      gap: theme.spacing['spacing-xs'],
    },
    machineInfo: {
      flexDirection: 'row',
      gap: theme.spacing['spacing-sm'],
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xxs'],
    },
  });

  return { styles, theme };
};
