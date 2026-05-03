import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useMyLaundriesTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
    },
    listContent: {
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-sm'],
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-md'],
      paddingBottom: theme.spacing['spacing-xxxxl'],
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Item styles
    item: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-lg'],
      paddingVertical: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-sm'],
      ...theme.shadowCard,
    },
    itemIcon: {
      width: theme.spacing['spacing-xxxl'],
      height: theme.spacing['spacing-xxxl'],
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-background'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContent: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
    itemTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
      flexWrap: 'wrap',
    },
    itemTagsRow: {
      flexDirection: 'row',
      gap: theme.spacing['spacing-xxs'],
      // marginTop intentional: adds asymmetric spacing between itemTitleRow and
      // itemTagsRow, larger than the parent gap, to visually separate the title
      // group from the tags group within the same flex column.
      marginTop: theme.spacing['spacing-xxs'],
      flexWrap: 'wrap',
    },
    itemChevron: {
      alignSelf: 'center',
    },
    itemCodeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xxs'],
    },
    actionRemove: {
      backgroundColor: theme.surfaceColor['surface-error'],
      alignItems: 'center',
      justifyContent: 'center',
      width: theme.spacing['spacing-xxxl'] * 2,
      gap: theme.spacing['spacing-xxs'],
      borderTopRightRadius: theme.cornerRad['corner-rad-lg'],
      borderBottomRightRadius: theme.cornerRad['corner-rad-lg'],
    },
    actionQR: {
      backgroundColor: theme.surfaceColor['surface-invert'],
      alignItems: 'center',
      justifyContent: 'center',
      width: theme.spacing['spacing-xxxl'] * 2,
      gap: theme.spacing['spacing-xxs'],
      borderTopRightRadius: theme.cornerRad['corner-rad-lg'],
      borderBottomRightRadius: theme.cornerRad['corner-rad-lg'],
    },
  });

  return { styles, theme };
};
