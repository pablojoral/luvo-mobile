import { StyleSheet } from 'react-native';
import { Colors } from 'theme/constants/colors';
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
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderRadius: theme.cornerRad['corner-rad-md'],
      borderColor: error ? theme.borderColor['border-error'] : theme.fontColor['font-primary'],
      paddingHorizontal: theme.spacing['spacing-sm'],
    },
    optionsList: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: Colors['colors-lavender-300'],
      borderRadius: theme.cornerRad['corner-rad-md'],
      overflow: 'hidden',
    },
    option: {
      paddingVertical: theme.spacing['spacing-sm'],
      paddingHorizontal: theme.spacing['spacing-md'],
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderBottomWidth: theme.borderWidth['border-width-xs'],
      borderBottomColor: Colors['colors-lavender-200'],
    },
    optionLast: {
      borderBottomWidth: 0,
    },
    optionSelected: {
      backgroundColor: Colors['colors-lavender-100'],
    },
    footer: {
      flexDirection: 'row',
    },
  });

  return { styles, theme };
};
