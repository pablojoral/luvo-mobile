import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from 'theme/constants/colors';

export const useAvatarPickerTheme = () => {
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
      // paddingHorizontal: theme.spacing['spacing-lg'],
      paddingTop: theme.spacing['spacing-sm'],
      paddingBottom: theme.spacing['spacing-xxl'] + theme.spacing['spacing-xs'],
      gap: theme.spacing['spacing-md'],
    },
    handle: {
      width: theme.spacing['spacing-xxxl'],
      height: theme.spacing['spacing-xxs'],
      borderRadius: theme.spacing['spacing-xxs'] / 2,
      backgroundColor: Colors['colors-grey-100'],
      alignSelf: 'center',
    },
    title: {
      textAlign: 'center',
    },
    columnWrapper: {
      gap: theme.spacing['spacing-xs'],
      justifyContent: 'center',
    },
  });

  return { styles, theme };
};
