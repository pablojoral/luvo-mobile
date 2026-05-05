import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/hooks/useTheme';

export const useMachinesListTheme = () => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: theme.surfaceColor['surface-invert'],
      gap: theme.spacing['spacing-sm'],
    },
    listContentContainerStyle: {
      flexGrow: 1,
      paddingBottom: bottom + 2 * theme.spacing['spacing-xxxl'],
    },
  });

  return { styles, theme };
};
