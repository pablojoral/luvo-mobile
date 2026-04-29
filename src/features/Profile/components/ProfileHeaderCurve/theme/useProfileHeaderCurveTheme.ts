import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

// Curve height is purely geometric — not a design token.
export const CURVE_HEIGHT = 40;

export const useProfileHeaderCurveTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      // overflow hidden prevents the Android rendering seam between the
      // white header block and the SVG curve fill.
      overflow: 'hidden',
      backgroundColor: theme.surfaceColor['surface-background'],
    },
  });

  const fillColor = theme.surfaceColor['surface-primary'];

  return { styles, fillColor };
};
