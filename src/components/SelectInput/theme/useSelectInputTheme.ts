import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

interface Params {
  error?: boolean;
}

export const useSelectInputTheme = ({ error = false }: Params = {}) => {
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
      borderWidth: theme.borderWidth['border-width-xs'],
      borderRadius: theme.cornerRad['corner-rad-md'],
      borderColor: error ? theme.borderColor['border-error'] : theme.fontColor['font-primary'],
      paddingHorizontal: theme.spacing['spacing-sm'],
    },
    optionsList: {
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-secondary'],
      borderRadius: theme.cornerRad['corner-rad-md'],
      overflow: 'hidden',
    },
    option: {
      paddingVertical: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      borderBottomWidth: theme.borderWidth['border-width-xs'],
      borderBottomColor: theme.borderColor['border-secondary'],
    },
    optionLast: {
      borderBottomWidth: 0,
    },
    optionSelected: {
      backgroundColor: theme.surfaceColor['surface-secondary'],
    },
    footer: {
      flexDirection: 'row',
    },
  });

  return { styles, theme };
};
