// theme/useLaundryDetailsModalTheme.ts
import { StyleSheet } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

export const useLaundryDetailsCardTheme = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    dragIndicatorContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: theme.spacing['spacing-xs'],
      paddingBottom: theme.spacing['spacing-xs'],
    },
    dragIndicator: {
      width: 50,
      borderRadius: theme.cornerRad['corner-rad-full'],
      borderTopColor: theme.borderColor['border-secondary'],
      borderTopWidth: theme.borderWidth['border-width-md'],
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['spacing-md'],
      paddingBottom: theme.spacing['spacing-sm'],
      gap: theme.spacing['spacing-md'],
    },
    infoContainer: {
      flex: 1,
      flexShrink: 1,
    },
    infoContentContainer: {
      justifyContent: 'space-between',
      gap: theme.spacing['spacing-xs'],
      flexWrap: 'wrap',
    },
    textContainer: {
      gap: theme.spacing['spacing-xs'],
    },
    imageContainer: {
      flexShrink: 0,
      justifyContent: 'center',
      alignItems: 'center',
      height: 112,
      width: 112,
      borderRadius: theme.cornerRad['corner-rad-full'],
      overflow: 'hidden',
      borderWidth: theme.borderWidth['border-width-xs'],
      borderColor: theme.borderColor['border-primary'],
    },
  });

  return { styles, theme };
};
