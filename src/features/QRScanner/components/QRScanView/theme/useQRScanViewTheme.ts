import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useQRScanViewTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewfinderRow: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    instructions: {
      alignItems: 'center',
      paddingHorizontal: theme.spacing['spacing-xxxl'],
      paddingBottom: theme.spacing['spacing-xxxxl'],
      gap: theme.spacing['spacing-xs'],
    },
  });

  return { styles, theme };
};
