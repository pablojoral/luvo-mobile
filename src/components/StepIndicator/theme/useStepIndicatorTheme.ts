import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

const DOT_SIZE = 6;
const DOT_ACTIVE_WIDTH = 18;

export const useStepIndicatorTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing['spacing-xs'],
    },
    dot: {
      height: DOT_SIZE,
      borderRadius: theme.cornerRad['corner-rad-full'],
    },
  });

  return {
    styles,
    dotSize: DOT_SIZE,
    dotActiveWidth: DOT_ACTIVE_WIDTH,
    dotColor: theme.surfaceColor['surface-disabled'],
    dotActiveColor: theme.fontColor['font-highlight'],
  };
};
