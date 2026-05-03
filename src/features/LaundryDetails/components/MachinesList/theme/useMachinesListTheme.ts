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
    typeSelectorContainer: {
      paddingHorizontal: theme.spacing['spacing-md'],
    },
    listContentContainerStyle: {
      flexGrow: 1,
      padding: theme.spacing['spacing-md'],
      paddingBottom: bottom + 2 * theme.spacing['spacing-xxxl'],
    },
  });

  return { styles, theme };
};
