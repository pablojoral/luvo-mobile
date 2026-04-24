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
      gap: theme.spacing['spacing-sm'],
    },
    groupTitle: {
      paddingHorizontal: theme.spacing['spacing-xs'],
    },
    groupCard: {
      borderRadius: theme.cornerRad['corner-rad-xxl'],
      backgroundColor: Colors['colors-white'],
      overflow: 'hidden',
      ...theme.shadowBox,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing['spacing-lg'],
      paddingVertical: theme.spacing['spacing-lg'],
      gap: theme.spacing['spacing-md'],
    },
    rowSeparator: {
      height: theme.borderWidth['border-width-xs'],
      backgroundColor: theme.borderColor['border-primary'],
      // marginLeft intentional: computed indent to align the separator flush
      // with the row text (past icon + row gap). Cannot be expressed as gap/padding.
      marginLeft: theme.spacing['spacing-lg'] + ROW_ICON_SIZE + theme.spacing['spacing-md'],
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
