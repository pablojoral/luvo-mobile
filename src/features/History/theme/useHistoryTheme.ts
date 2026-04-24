import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useHistoryTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingTop: theme.topInset,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
    },
    // Stats card
    statsCard: {
      backgroundColor: theme.surfaceColor['surface-invert'],
      borderRadius: 16,
      padding: theme.spacing['spacing-xl'],
      marginBottom: theme.spacing['spacing-xl'],
      marginTop: theme.spacing['spacing-lg'],
    },
    statsLabel: {
      fontSize: theme.fontSize['font-size-sm'],
      color: theme.fontColor['font-invert'],
      opacity: 0.7,
      marginBottom: theme.spacing['spacing-xs'],
    },
    statsAmount: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.fontColor['font-invert'],
      marginBottom: theme.spacing['spacing-xs'],
    },
    statsCycles: {
      fontSize: theme.fontSize['font-size-sm'],
      color: theme.fontColor['font-invert'],
      opacity: 0.7,
    },
    // Cycle card
    cycleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-lg'],
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor['border-primary'],
      gap: theme.spacing['spacing-md'],
    },
    cycleIconBox: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.surfaceColor['surface-secondary'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    cycleInfo: {
      flex: 1,
    },
    cycleMachine: {
      fontSize: theme.fontSize['font-size-md'],
      fontWeight: '600',
      color: theme.fontColor['font-primary'],
    },
    cycleLaundry: {
      fontSize: theme.fontSize['font-size-sm'],
      color: theme.fontColor['font-secondary'],
      marginTop: 2,
    },
    cycleRight: {
      alignItems: 'flex-end',
    },
    cycleAmount: {
      fontSize: theme.fontSize['font-size-md'],
      fontWeight: '600',
      color: theme.fontColor['font-primary'],
    },
    cycleDate: {
      fontSize: theme.fontSize['font-size-xs'],
      color: theme.fontColor['font-placeholder'],
      marginTop: 2,
    },
    sharedBadge: {
      fontSize: theme.fontSize['font-size-xs'],
      color: theme.fontColor['font-secondary'],
      marginTop: 2,
    },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing['spacing-xl'],
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return { styles, theme };
};
