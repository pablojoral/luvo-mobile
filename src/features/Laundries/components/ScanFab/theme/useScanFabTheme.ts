import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useScanFabTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      width: 56,
      height: 56,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-invert'],
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadowBox,
    },
  });

  return { styles, theme };
};
