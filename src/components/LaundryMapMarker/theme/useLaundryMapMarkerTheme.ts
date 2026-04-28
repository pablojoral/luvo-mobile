import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryMapMarkerTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  });

  const wrapperStyle = useMemo(
    () => [styles.wrapper, { padding: theme.spacing['spacing-sm'], ...theme.shadowFloating }],
    [styles.wrapper, theme],
  );

  return { styles, wrapperStyle, theme };
};
