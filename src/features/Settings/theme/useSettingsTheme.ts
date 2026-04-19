import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useSettingsTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],

      paddingTop: theme.topInset,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      paddingBottom: theme.bottomInset + theme.spacing['spacing-xl'],
      gap: theme.spacing['spacing-xl'],
    },
    group: {
      gap: theme.spacing['spacing-sm'],
    },
    groupTitle: {
      paddingHorizontal: theme.spacing['spacing-xs'],
    },
    groupCard: {
      borderRadius: theme.cornerRad['corner-rad-xl'],
      backgroundColor: theme.surfaceColor['surface-invert'],
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing['spacing-lg'],
      paddingVertical: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-md'],
    },
    rowSeparator: {
      height: theme.borderWidth['border-width-xs'],
      backgroundColor: theme.borderColor['border-primary'],
      marginLeft: theme.spacing['spacing-lg'] + 40 + theme.spacing['spacing-md'],
    },
    rowIcon: {
      width: 40,
      height: 40,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-background'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowContent: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
    rowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
  });

  return { styles };
};
