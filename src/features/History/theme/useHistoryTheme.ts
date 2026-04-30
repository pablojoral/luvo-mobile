import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useHistoryTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
    },
    // Stats card
    statsCard: {
      backgroundColor: theme.surfaceColor['surface-invert'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      padding: theme.spacing['spacing-xl'],
      // marginBottom intentional: asymmetric offset between the FlatList header
      // component and the first list item — cannot be expressed as gap since
      // header and list items are not siblings in a single flex container.
      marginBottom: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-xs'],
    },
    statsLabel: {
      fontSize: theme.fontSize['font-size-sm'],
      color: theme.fontColor['font-invert'],
      opacity: 0.7,
    },
    statsAmount: {
      fontSize: theme.fontSize['font-size-xxxxl'],
      fontWeight: theme.fontWeight.semibold,
      color: theme.fontColor['font-invert'],
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
      width: theme.spacing['spacing-xxxl'],
      height: theme.spacing['spacing-xxxl'],
      borderRadius: theme.cornerRad['corner-rad-lg'],
      backgroundColor: theme.surfaceColor['surface-secondary'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    cycleInfo: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
    cycleMachine: {
      fontSize: theme.fontSize['font-size-md'],
      fontWeight: '600',
      color: theme.fontColor['font-primary'],
    },
    cycleLaundry: {
      fontSize: theme.fontSize['font-size-sm'],
      color: theme.fontColor['font-secondary'],
    },
    cycleRight: {
      alignItems: 'flex-end',
      gap: theme.spacing['spacing-xxxs'],
    },
    cycleAmount: {
      fontSize: theme.fontSize['font-size-md'],
      fontWeight: '600',
      color: theme.fontColor['font-primary'],
    },
    cycleDate: {
      fontSize: theme.fontSize['font-size-xs'],
      color: theme.fontColor['font-placeholder'],
    },
    sharedBadge: {
      fontSize: theme.fontSize['font-size-xs'],
      color: theme.fontColor['font-secondary'],
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
