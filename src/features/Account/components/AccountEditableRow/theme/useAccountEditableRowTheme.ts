import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useAccountEditableRowTheme = (hasError = false) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderRadius: theme.cornerRad['corner-rad-xl'],
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingTop: theme.spacing['spacing-md'],
      paddingBottom: theme.spacing['spacing-xs'],
      gap: theme.spacing['spacing-xxs'],
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: hasError
        ? theme.borderColor['border-error']
        : theme.borderColor['border-transparent'],
      ...theme.shadowCard,
    },
    input: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: theme.fontSize['font-size-md'],
      color: theme.fontColor['font-primary'],
      paddingVertical: theme.spacing['spacing-xxs'],
      paddingHorizontal: 0,
    },
  });

  return { styles, placeholderColor: theme.fontColor['font-placeholder'] };
};
