import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const usePaymentTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    header: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingTop:     theme.topInset + theme.spacing['spacing-sm'],
      paddingBottom:  theme.spacing['spacing-sm'],
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor['border-secondary'],
    },
    scrollContent: {
      padding:    theme.spacing['spacing-md'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
    },
    machineCard: {
      backgroundColor: theme.surfaceColor['surface-secondary'],
      borderRadius:    theme.cornerRad['corner-rad-lg'],
      padding:         theme.spacing['spacing-md'],
      marginBottom:    theme.spacing['spacing-lg'],
    },
    machineRow: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           theme.spacing['spacing-sm'],
    },
    machineInfo: {
      flex: 1,
      gap:  2,
    },
    sectionTitle: {
      marginBottom: theme.spacing['spacing-xs'],
    },
    confirmWrap: {
      marginTop: theme.spacing['spacing-xl'],
    },
    centeredState: {
      flex:           1,
      alignItems:     'center',
      paddingTop:     theme.spacing['spacing-xxxl'],
      gap:            theme.spacing['spacing-sm'],
    },
    resultIcon: {
      width:          72,
      height:         72,
      borderRadius:   36,
      alignItems:     'center',
      justifyContent: 'center',
      marginBottom:   theme.spacing['spacing-sm'],
    },
    statusMsg: {
      marginTop: theme.spacing['spacing-xs'],
      textAlign: 'center',
    },
    statusSub: {
      textAlign:    'center',
      paddingHorizontal: theme.spacing['spacing-xl'],
    },
    actionButton: {
      marginTop: theme.spacing['spacing-lg'],
      width:     '100%',
    },
  });

  return { styles, theme };
};
