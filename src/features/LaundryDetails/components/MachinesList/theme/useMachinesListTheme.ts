import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/hooks/useTheme';

export const useMachinesListTheme = () => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    typeSelectorContainer: {
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingVertical: theme.spacing['spacing-xs'],
    },
    listContentContainerStyle: {
      flexGrow: 1,
      padding: theme.spacing['spacing-md'],
      paddingBottom: bottom + 2 * theme.spacing['spacing-xxxl'],
    },
  });

  return { styles, theme };
};
