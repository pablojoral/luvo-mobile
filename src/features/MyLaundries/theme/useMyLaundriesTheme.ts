import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useMyLaundriesTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: theme.topInset,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    listContent: {
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
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
      borderRadius: theme.cornerRad['corner-rad-xl'],
      padding: theme.spacing['spacing-md'],
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xl'],
    },
    itemIcon: {
      width: 40,
      height: 40,
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
      marginTop: theme.spacing['spacing-xxs'],
      flexWrap: 'wrap',
    },
    itemChevron: {
      alignSelf: 'center',
    },
  });

  return { styles, theme };
};
