import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from 'theme/constants/colors';

export const useSettingsTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors['colors-white'],
      paddingTop: theme.topInset,
    },
    scroll: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-primary'],
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
      letterSpacing: 1.5,
    },
    rowCard: {
      borderRadius: theme.cornerRad['corner-rad-lg'],
      backgroundColor: Colors['colors-white'],
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
