import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';


export const useScanFabTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      width: theme.componentSize.fab,
      height: theme.componentSize.fab,
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-invert'],
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadowFloating,
    },
  });

  return { styles, theme };
};
