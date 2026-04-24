import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from 'theme/constants/colors';

const ROW_ICON_SIZE = 40;
const NAME_INPUT_HEIGHT = 36;

export const useAccountTheme = () => {
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
    avatarSection: {
      alignItems: 'center',
      paddingVertical: theme.spacing['spacing-lg'],
    },
    avatarButton: {
      position: 'relative',
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: theme.spacing['spacing-xl'],
      height: theme.spacing['spacing-xl'],
      borderRadius: theme.spacing['spacing-xl'] / 2,
      backgroundColor: theme.surfaceColor['surface-invert'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing['spacing-lg'],
      paddingVertical: theme.spacing['spacing-md'],
      gap: theme.spacing['spacing-md'],
    },
    rowIcon: {
      width: ROW_ICON_SIZE,
      height: ROW_ICON_SIZE,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-background'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameInputWrapper: {
      flex: 1,
    },
    nameInput: {
      borderWidth: 0,
      paddingHorizontal: 0,
      height: NAME_INPUT_HEIGHT,
    },
    separator: {
      height: theme.borderWidth['border-width-xs'],
      backgroundColor: theme.borderColor['border-primary'],
      // marginLeft intentional: computed indent to align the separator line
      // flush with the row text (past icon + row gap). Cannot be gap/padding.
      marginLeft: theme.spacing['spacing-lg'] + ROW_ICON_SIZE + theme.spacing['spacing-md'],
    },
    providerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing['spacing-lg'],
      paddingVertical: theme.spacing['spacing-lg'],
      gap: theme.spacing['spacing-md'],
    },
    providerLabel: {
      flex: 1,
    },
    vinculadaBadge: {
      borderRadius: theme.cornerRad['corner-rad-full'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: Colors['colors-green-300'],
      paddingHorizontal: theme.spacing['spacing-sm'],
      paddingVertical: theme.spacing['spacing-xs'],
    },
    vinculadaText: {
      color: Colors['colors-green-700'],
    },
    deleteRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing['spacing-lg'],
      paddingVertical: theme.spacing['spacing-lg'],
      gap: theme.spacing['spacing-md'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: Colors['colors-red-300'],
      backgroundColor: Colors['colors-red-50'],
    },
    deleteRowIcon: {
      width: ROW_ICON_SIZE,
      height: ROW_ICON_SIZE,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: Colors['colors-red-100'],
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles, theme };
};
