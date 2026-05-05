import { StyleSheet } from 'react-native';
import { IconSize } from 'theme/types/Theme';
import { useTheme } from 'theme/hooks/useTheme';

export const useLoaderTheme = (size: IconSize) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles, iconSize: theme.iconSize[size] };
};
