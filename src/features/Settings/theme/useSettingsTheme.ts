import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from 'theme/constants/colors';

const ROW_ICON_SIZE = 40;

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
      gap: theme.spacing['spacing-xxl'],
    },
    group: {
      gap: theme.spacing['spacing-xs'],
      paddingHorizontal: 0,
    },
    groupTitle: {
      paddingHorizontal: theme.spacing['spacing-xs'],
    },
    rowCard: {
      borderRadius: theme.cornerRad['corner-rad-lg'],
      backgroundColor: Colors['colors-white'],
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-md'],
      ...theme.shadowCard,
    },
    rowIcon: {
      width: ROW_ICON_SIZE,
      height: ROW_ICON_SIZE,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: Colors['colors-white'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-secondary'],
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

  return { styles, theme };
};
