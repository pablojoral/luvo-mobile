import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from 'theme/constants/colors';

export const useLanguagePickerTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: Colors['colors-semi-transparent'],
    },
    sheet: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxxl'],
      paddingTop: theme.spacing['spacing-sm'],
      paddingBottom: theme.spacing['spacing-xxl'],
    },
    handle: {
      width: theme.spacing['spacing-xxxl'],
      height: theme.spacing['spacing-xxs'],
      borderRadius: theme.spacing['spacing-xxs'] / 2,
      backgroundColor: Colors['colors-grey-100'],
      alignSelf: 'center',
      marginBottom: theme.spacing['spacing-md'],
    },
    title: {
      textAlign: 'center',
      paddingBottom: theme.spacing['spacing-md'],
    },
    rowBase: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingVertical: theme.spacing['spacing-md'],
    },
    rowSelected: {
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    rowUnselected: {
      backgroundColor: theme.surfaceColor['surface-primary'],
    },
    separator: {
      height: theme.borderWidth['border-width-xs'],
      backgroundColor: theme.borderColor['border-secondary'],
      marginHorizontal: theme.spacing['spacing-xl'],
    },
    checkmark: {
      width: theme.spacing['spacing-md'],
      height: theme.spacing['spacing-md'],
      borderRadius: theme.cornerRad['corner-rad-full'],
      backgroundColor: theme.surfaceColor['surface-invert'],
    },
    checkmarkPlaceholder: {
      width: theme.spacing['spacing-md'],
      height: theme.spacing['spacing-md'],
    },
  });

  return { styles, theme };
};
