import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAccountSectionLabelTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    label: {
      letterSpacing: theme.letterSpacing.label,
      paddingLeft: theme.spacing['spacing-xxs'],
      textTransform: 'uppercase',
    },
  });

  return { styles };
};
