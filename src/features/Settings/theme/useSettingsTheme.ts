import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';


export const useSettingsTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    body: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-background'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
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
      gap: theme.spacing['spacing-xs'],
      paddingHorizontal: 0,
    },
    groupTitle: {
      paddingHorizontal: theme.spacing['spacing-xs'],
      letterSpacing: theme.letterSpacing.label,
    },
    rowCard: {
      borderRadius: theme.cornerRad['corner-rad-lg'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-sm'],
      ...theme.shadowCard,
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

  return { styles, theme };
};
