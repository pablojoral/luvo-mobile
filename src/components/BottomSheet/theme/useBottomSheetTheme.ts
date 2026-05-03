import { StyleSheet } from 'react-native';
import { Colors } from 'theme/constants/colors';
import { useTheme } from 'theme/hooks/useTheme';

export const useBottomSheetTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors['colors-semi-transparent'],
    },
    backdropPress: {
      flex: 1,
    },
    sheet: {
      backgroundColor: theme.surfaceColor['surface-primary'],
      borderTopLeftRadius: theme.cornerRad['corner-rad-xxxl'],
      borderTopRightRadius: theme.cornerRad['corner-rad-xxxl'],
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
      paddingHorizontal: theme.spacing['spacing-lg'],
    },
  });

  return { styles };
};
