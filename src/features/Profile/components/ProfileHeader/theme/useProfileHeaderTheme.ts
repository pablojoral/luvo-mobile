import { StyleSheet } from 'react-native';
import { Colors } from 'theme/constants/colors';
import { useTheme } from 'theme/hooks/useTheme';

const AVATAR_SIZE = 64;

export const useProfileHeaderTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors['colors-white'],
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-md'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingTop: theme.topInset + theme.spacing['spacing-xs'],
      paddingBottom: theme.spacing['spacing-xl'],
    },
    textContainer: {
      flex: 1,
    },
  });

  return { styles, AVATAR_SIZE };
};
