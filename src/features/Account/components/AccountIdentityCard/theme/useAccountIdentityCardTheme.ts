import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const AVATAR_SIZE = 64;

export const useAccountIdentityCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xxl'],
      paddingHorizontal: theme.spacing['spacing-lg'],
      paddingVertical: theme.spacing['spacing-lg'],
      ...theme.shadowCard,
    },
    textContainer: {
      flex: 1,
      gap: theme.spacing['spacing-xxxs'],
    },
    clientLabel: {
      letterSpacing: theme.letterSpacing.label,
      textTransform: 'uppercase',
    },
  });

  return { styles, AVATAR_SIZE };
};
