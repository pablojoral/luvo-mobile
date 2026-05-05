import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

interface Params {
  error?: boolean;
  disabled?: boolean;
}

export const useSelectInputTheme = ({ error = false, disabled = false }: Params = {}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.spacing['spacing-xxs'],
    },
    trigger: {
      width: '100%',
      height: theme.spacing['spacing-xxxxl'],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderRadius: theme.cornerRad['corner-rad-md'],
      borderColor: error ? theme.borderColor['border-error'] : theme.borderColor['border-primary'],
      paddingHorizontal: theme.spacing['spacing-sm'],
      opacity: disabled ? 0.5 : 1,
    },
    footer: {
      flexDirection: 'row',
    },
    optionsList: {
      overflow: 'hidden',
    },
  });

  return { styles, theme };
};
