import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const AVATAR_SIZE = 86;

export const useProfileHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingBottom: theme.spacing['spacing-lg'],
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-lg'],
    },
    avatarTile: {
      borderRadius: theme.cornerRad['corner-rad-xl'],
      overflow: 'hidden',
      ...theme.shadowCard,
    },
    textContainer: {
      gap: theme.spacing['spacing-xxs'],
    },
    logoContainer: {},
  });

  const containerTopStyle = useMemo(
    () => ({ paddingTop: theme.topInset + theme.spacing['spacing-xl'] }),
    [theme.topInset, theme.spacing],
  );

  return { styles, containerTopStyle, AVATAR_SIZE };
};
