import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const AVATAR_SIZE = 64;

export const useProfileSkeletonTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingTop: theme.topInset + theme.spacing['spacing-xs'],
      paddingBottom: theme.spacing['spacing-lg'],
    },
    headerText: {
      flex: 1,
      gap: theme.spacing['spacing-xs'],
    },
    contentContainer: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-invert'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
    },
    menusContainer: {
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.spacing['spacing-lg'],
      gap: theme.spacing['spacing-md'],
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      paddingVertical: theme.spacing['spacing-xs'],
      paddingHorizontal: theme.spacing['spacing-sm'],
    },
    rowLabel: {
      flex: 1,
    },
  });

  return { styles, avatarSize: AVATAR_SIZE };
};
