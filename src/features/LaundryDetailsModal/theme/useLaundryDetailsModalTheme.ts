// theme/useLaundryDetailsModalTheme.ts
import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryDetailsModalTheme = () => {
  const theme = useTheme();
  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: theme.surfaceColor['surface-invert'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxl'],
      overflow: 'hidden',
    },
    listContainer: {
      width: '100%',
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  });

  return { styles, theme, width };
};
