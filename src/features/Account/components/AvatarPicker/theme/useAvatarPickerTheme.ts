import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAvatarPickerTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    columnWrapper: {
      gap: theme.spacing['spacing-xs'],
      justifyContent: 'center',
    },
  });

  return { styles, theme };
};
