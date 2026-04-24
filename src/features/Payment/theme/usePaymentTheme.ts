import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const usePaymentTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    scrollContent: {
      padding: theme.spacing['spacing-md'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-lg'],
    },
    machineCard: {
      backgroundColor: theme.surfaceColor['surface-secondary'],
      borderRadius: theme.cornerRad['corner-rad-lg'],
      padding: theme.spacing['spacing-md'],
    },
    machineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
    },
    machineInfo: {
      flex: 1,
      gap: 2,
    },
    idleContent: {
      gap: theme.spacing['spacing-xs'],
    },
    confirmWrap: {
      paddingTop: theme.spacing['spacing-xl'],
    },
    centeredState: {
      flex: 1,
      alignItems: 'center',
      paddingTop: theme.spacing['spacing-xxxl'],
      gap: theme.spacing['spacing-sm'],
    },
    resultIcon: {
      width: theme.spacing['spacing-xxxl'] + theme.spacing['spacing-xxl'],
      height: theme.spacing['spacing-xxxl'] + theme.spacing['spacing-xxl'],
      borderRadius: theme.cornerRad['corner-rad-full'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    resultIconSuccess: {
      backgroundColor: theme.surfaceColor['surface-success'],
    },
    resultIconError: {
      backgroundColor: theme.surfaceColor['surface-error'],
    },
    statusMsg: {
      textAlign: 'center',
    },
    statusSub: {
      textAlign: 'center',
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
    actionButton: {
      // marginTop intentional: asymmetric spacing before the primary action,
      // larger than the container gap to visually separate it from status text.
      marginTop: theme.spacing['spacing-lg'],
      width: '100%',
    },
  });

  return { styles, theme };
};
